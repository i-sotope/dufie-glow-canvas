
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno&deno-std=0.132.0' // Use compatible Stripe version
import { corsHeaders } from '../_shared/cors.ts'

console.log("create-stripe-checkout function initializing.");

// Initialize Stripe client with the secret key from environment variables
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16", // Use a fixed API version
  httpClient: Stripe.createFetchHttpClient(), // Use Deno's fetch
});

// Define expected structure for items coming from the frontend cart
interface CartItem {
  id: string; // Product ID
  name: string;
  quantity: number;
  price: number; // Price per single item
  image_url?: string; // Optional image URL
}

// Define the expected request body structure
interface RequestBody {
  items: CartItem[];
  userId: string;
  shippingLocation: string;
  // Add any other relevant info needed for order creation here
}

serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("Received checkout request");
    const body: RequestBody = await req.json();
    const { items, userId, shippingLocation } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Missing or invalid items in request body.");
    }
    if (!userId) {
      throw new Error("Missing userId in request body.");
    }
     if (!shippingLocation) {
      throw new Error("Missing shippingLocation in request body.");
    }

    console.log("Request body parsed:", body);

    // --- Important: Determine your site's base URL ---
    // This is needed for the success/cancel URLs. 
    // Option 1: Hardcode for local testing (replace with your actual local URL)
    // const siteUrl = "http://localhost:5173"; 
    // Option 2: Get from environment variable (set this in Supabase secrets/env vars)
    const siteUrl = Deno.env.get("SITE_URL") || "http://localhost:5173"; // Fallback for local dev
    // Option 3: Dynamically determine (more complex, might use req.headers.origin if reliable)
    // const siteUrl = req.headers.get('origin') || Deno.env.get("SITE_URL") || "http://localhost:5173";
    console.log(`Using site URL: ${siteUrl}`);

    // Format line items for Stripe
    const line_items = items.map((item) => {
      // Stripe expects price in the smallest currency unit (e.g., cents)
      const unitAmount = Math.round(item.price * 100); 
      console.log(`Processing item: ${item.name}, Price: ${item.price}, UnitAmount: ${unitAmount}`);
      return {
        price_data: {
          currency: "usd", // Change if needed
          product_data: {
            name: item.name,
            // Optionally include images: images: item.image_url ? [item.image_url] : [],
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    console.log("Formatted line_items:", line_items);

    // Metadata to store order details for the webhook
    // We stringify the items array to store it within metadata limits
    const metadata = {
      user_id: userId,
      shipping_location: shippingLocation,
      items_json: JSON.stringify(items.map(item => ({ // Store relevant item details
         product_id: item.id,
         name: item.name,
         quantity: item.quantity,
         price_at_purchase: item.price,
         image_url: item.image_url
      }))) 
    };

    console.log("Prepared metadata:", metadata);

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${siteUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`, // Assumed cancel URL
      metadata: metadata, // Attach order details here!
    });

    console.log("Stripe session created:", session.id);

    // Return the session ID to the client
    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
})

console.log("create-stripe-checkout function initialized successfully."); 
