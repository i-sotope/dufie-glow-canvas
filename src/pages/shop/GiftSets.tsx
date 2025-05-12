import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Gift, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define the type for an individual product
interface Product {
  id: string;
  name: string;
  price: number;
  // Add other relevant product fields if needed for display later
}

// Define the type for a gift set, now including its constituent products
interface GiftSet {
  id: string; // ID of the gift set itself
  name: string;
  description: string | null;
  set_price: number | null; // The actual discounted price of the set
  original_price: number | null; // The price if items bought separately
  rating: number | null; // Rating for the set? Or average? Keep as is for now.
  image_url: string | null;
  included_product_ids: string[] | null; // Raw IDs from DB
  included_products: Product[] | null; // Populated after fetching product details
}

const GiftSets = () => {
  const { addToCart, isLoading: isCartLoading } = useCart();
  const [giftSets, setGiftSets] = useState<GiftSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGiftSets = async () => {
      setIsLoading(true);
      setError(null);
      const processedGiftSets: GiftSet[] = [];

      try {
        // 1. Fetch gift set definitions (assuming a 'gift_sets' table)
        // Adjust 'gift_sets' and column names if your schema is different
        const { data: giftSetDefinitions, error: giftSetError } = await supabase
          .from('gift_sets')
          // Select the new price columns
          .select('id, name, description, rating, image_url, included_product_ids, set_price, original_price');

        if (giftSetError) {
          throw giftSetError;
        }

        if (!giftSetDefinitions || giftSetDefinitions.length === 0) {
          setGiftSets([]);
          setIsLoading(false);
          return;
        }

        // 2. Fetch included products for each gift set
        for (const setDef of giftSetDefinitions) {
          let includedProducts: Product[] = [];

          if (setDef.included_product_ids && setDef.included_product_ids.length > 0) {
            const { data: productsData, error: productsError } = await supabase
              .from('products')
              .select('id, name, price') // Fetch necessary product details
              .in('id', setDef.included_product_ids);

            if (productsError) {
              console.warn(`Error fetching products for gift set ${setDef.id}:`, productsError);
              // Decide how to handle this: skip set, show set with error, price 0?
              // Here we'll proceed but the price will be 0 and products null.
            } else if (productsData) {
              includedProducts = productsData as Product[];
            }
          }

          processedGiftSets.push({
            ...setDef,
            included_products: includedProducts.length > 0 ? includedProducts : null,
            // Ensure prices are numbers or null
            set_price: setDef.set_price ? Number(setDef.set_price) : null,
            original_price: setDef.original_price ? Number(setDef.original_price) : null,
          });
        }

        setGiftSets(processedGiftSets);

      } catch (err: any) {
        console.error("Error fetching gift sets:", err);
        setError("Failed to load gift sets. Please try again later.");
        toast.error("Failed to load gift sets.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiftSets();
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating: number | null) => {
    const numericRating = rating ?? 0;
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(numericRating)
            ? 'fill-primary text-primary'
            : i < numericRating
              ? 'fill-primary/50 text-primary'
              : 'text-muted'
        }`}
      />
    ));
  };

  // Calculate savings percentage - Placeholder, logic might need update based on individual product prices vs set price
  const calculateSavings = (current: number) => {
    // TODO: Implement savings calculation if needed
    // e.g., compare calculated set price vs sum of individual prices if bought separately
    // REMOVED - Calculation now happens inside the component render
    return 0;
  };

  // Format price to string like $120.00
  const formatPrice = (price: number | null): string => {
    if (price === null) return "$0.00";
    return `$${price.toFixed(2)}`;
  };

  // Add this handler function (assuming the item passed is 'set')
  const handleAddToCart = (set: GiftSet) => {
    // Adds the gift set as a single item to the cart.
    // Note: Your CartContext might need adjustment to properly handle
    // items that represent sets vs individual products.
    // It now sends gift_set_id instead of product_id for sets.
    if (set.set_price === null) {
      toast.error("Cannot add item without a price.");
      return; // Prevent adding item without a price
    }

    // Prepare the cart item data for Supabase
    // Note: The exact structure depends on your CartContext's `addToCart` function
    // and how it passes data to the Supabase insert.
    // This example assumes `addToCart` takes an object that maps directly
    // to the columns in your `cart_items` table.
    // You MAY need to adjust your CartContext implementation.
    const cartItemPayload = {
      // product_id will be null for gift sets
      product_id: null,
      // gift_set_id will contain the actual ID of the gift set
      gift_set_id: set.id, 
      // Include other necessary cart item details
      quantity: 1,
      // We pass the display details separately, assuming CartContext handles mapping?
      // OR, addToCart might need modification to accept these directly.
      name: set.name, // For display/context, not a DB column?
      price: set.set_price, // For display/context, not a DB column?
      image: set.image_url ?? undefined, // For display/context, not a DB column?
    };

    // Call the context function. Make sure it's adapted for the new payload structure!
    addToCart(cartItemPayload);

    toast.success(`${set.name} added to cart`); // Provide feedback
  };

  return (
    <PageLayout>
      <PageHeader
        title="Gift Sets"
        subtitle="Curated collections that make perfect gifts—for others or yourself."
      />

      <section className="py-16">
        <div className="container">
          {isLoading && <p className="text-center">Loading gift sets...</p>}
          {error && <p className="text-center text-destructive">{error}</p>}

          {!isLoading && !error && giftSets.length === 0 && (
             <p className="text-center text-muted-foreground">No gift sets found.</p>
          )}

          {!isLoading && !error && giftSets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {giftSets.map((set) => {
                // Calculate savings percentage
                const savingsPercentage =
                  set.original_price && set.set_price && set.original_price > set.set_price
                    ? Math.round(((set.original_price - set.set_price) / set.original_price) * 100)
                    : 0;

                const displayPrice = formatPrice(set.set_price); // Use discounted price
                const originalDisplayPrice = formatPrice(set.original_price); // Use original price

                return (
                  <Card
                    key={set.id}
                    className="border-0 bg-background rounded-xl overflow-hidden shadow-sm product-card flex flex-col" // Added flex flex-col
                  >
                    <div className="relative"> {/* Added relative positioning for the tag */}
                      <img
                        src={set.image_url ?? '/placeholder.jpg'}
                        alt={set.name}
                        className="w-full h-64 object-cover" // Adjusted height
                      />
                      {savingsPercentage > 0 && (
                        <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                          Save {savingsPercentage}%
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow"> {/* Added flex-grow */}
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(set.rating)}
                        </div>
                      </div>

                      <h3 className="font-playfair font-semibold text-xl mb-2">{set.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{set.description ?? 'No description available.'}</p>

                      {/* Optional: Display included products */}
                      {set.included_products && set.included_products.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Includes:</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {set.included_products.map(prod => (
                              <li key={prod.id}>{prod.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex-grow mb-4"></div> {/* Renamed, keeps space */}

                      <div className="mt-auto"> {/* Pushes price/button to bottom */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-lg mr-2">{displayPrice}</span>
                            {set.original_price && set.original_price > (set.set_price ?? 0) && (
                              <span className="text-sm text-muted-foreground line-through">
                                {originalDisplayPrice}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="rounded-full"
                            onClick={() => handleAddToCart(set)}
                            disabled={isCartLoading}
                          >
                            {isCartLoading ? 'Adding...' : 'Add to Cart'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="bg-secondary/30 rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-playfair font-bold mb-4">Create Your Own Gift Set</h2>
                <p className="text-muted-foreground mb-6">
                  Personalize a skincare collection for your loved ones (or yourself!) with 
                  our custom gift set builder. Choose 3 or more products and receive special bundle pricing.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm mr-3">1</span>
                    Select your products
                  </li>
                  <li className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm mr-3">2</span>
                    Choose your packaging
                  </li>
                  <li className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm mr-3">3</span>
                    Add a personal message
                  </li>
                </ul>
                <Button className="rounded-full">
                  Build Your Gift Set
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Customized gift set" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default GiftSets;
