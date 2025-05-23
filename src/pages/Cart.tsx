import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Plus, Minus, ShoppingCart, MapPin } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MapPickerModal from "@/components/MapPickerModal";
import { supabase } from "@/integrations/supabase/client";
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside the component with your publishable key
// Replace with your actual Publishable Key
const stripePromise = loadStripe('pk_test_51RLQNpQ2jbEjzSWxabgq3EH09ptRvKrpNU2yEswrtFUhJ9x01IawS7IfQYk7vkvFrklxNSzezOUk1r9XyrnEG7Jq00hzWsNcNW');

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, isLoading } = useCart();
  const { user } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please sign in to checkout");
      return;
    }

    // Common validations
    if (!deliveryLocation.trim()) {
      toast.error("Please enter a delivery location.");
      return;
    }
    if (!receiverNumber.trim()) {
      toast.error("Please enter the receiver's phone number.");
      return;
    }
    if (!/^\+?[0-9\s\-\(\)]{7,}$/.test(receiverNumber.trim())) {
        toast.error("Please enter a valid phone number.");
        return;
    }

    setCheckoutLoading(true);

    if (paymentMethod === 'stripe') {
      try {
        console.log("Calling Stripe checkout edge function...");
        
        // Call the Supabase Edge Function to create a Stripe checkout session
        const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
          body: {
            items: cartItems,
            userId: user.id,
            shippingLocation: deliveryLocation,
            // Could add receiverNumber here too if needed for order fulfillment
          },
        });

        if (error) {
          console.error("Edge function error:", error);
          throw new Error(error.message || "Failed to create checkout session");
        }

        if (!data?.sessionId) {
          throw new Error("No session ID returned from checkout function");
        }

        console.log("Stripe session created:", data.sessionId);
        
        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        if (!stripe) {
          throw new Error("Failed to load Stripe");
        }

        const { error: redirectError } = await stripe.redirectToCheckout({
          sessionId: data.sessionId
        });

        if (redirectError) {
          console.error("Stripe redirect error:", redirectError);
          throw redirectError;
        }

      } catch (error) {
        console.error("Checkout error:", error);
        toast.error(error.message || "Checkout failed. Please try again.");
        setCheckoutLoading(false);
      }

    } else if (paymentMethod === 'cod') {
      // --- Pay on Delivery Logic (inserts order directly) ---
      console.log("[Checkout COD] Starting...");
      const orderData = {
        user_id: user.id, 
        items: cartItems.map(item => ({ 
          product_id: item.id, 
          name: item.name, 
          quantity: item.quantity, 
          price_at_purchase: item.price, 
          image_url: item.image_url 
        })),
        total_price: cartTotal, 
        shipping_location: deliveryLocation, 
        status: 'Pending - COD', 
        payment_method: 'cod'
      };
  
      try {
        console.log("[Checkout COD] Attempting to insert order:", orderData);
        const { error } = await supabase
          .from('orders') 
          .insert([orderData]); 
  
        if (error) {
          console.error("[Checkout COD] Supabase insert error:", error); 
          throw error; 
        }
  
        console.log("[Checkout COD] Order inserted successfully");
        toast.success("Order placed successfully! You will pay upon delivery."); 
        clearCart(); 
        setDeliveryLocation("");
        setReceiverNumber("");
  
      } catch (error) { 
        console.error("[Checkout COD] Failed:", error); 
        toast.error(`Order placement failed: ${error.message || 'Please try again.'}`);
      } finally {
        console.log("[Checkout COD] Finally block");
        setCheckoutLoading(false);
      }
    } else {
      toast.error("Invalid payment method selected.");
      setCheckoutLoading(false);
    }
  };

  // Function to handle location selected from map
  const handleLocationSelect = (location: { lat: number; lng: number }) => { 
    // Format coordinates into a string for the input field
    const formattedLocation = `Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)}`;
    setDeliveryLocation(formattedLocation);
    setIsMapModalOpen(false); // Close the modal
  };

  return (
    <PageLayout>
      <PageHeader title="Shopping Cart" subtitle="Review and manage your selected items" />
      
      <div className="container py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground">Loading your cart...</p>
            </div>
          </div>
        ) : !user ? (
          <div className="text-center py-16">
            <div className="mb-6 flex justify-center">
              <ShoppingCart className="h-16 w-16 text-muted" />
            </div>
            <h2 className="text-2xl font-playfair font-semibold mb-4">Please sign in to view your cart</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Creating an account allows you to save your cart, track orders, and enjoy a personalized shopping experience.
            </p>
            <Button asChild className="rounded-full">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6 flex justify-center">
              <ShoppingCart className="h-16 w-16 text-muted" />
            </div>
            <h2 className="text-2xl font-playfair font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild className="rounded-full">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-md overflow-hidden">
                              <img 
                                src={item.image_url} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center border rounded-md">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Link to="/shop">
                    <Button 
                      variant="outline" 
                      className="rounded-full"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="border-0 shadow-sm p-6">
                <h3 className="font-playfair text-xl font-semibold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="deliveryLocation">Delivery Location</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="deliveryLocation" 
                        placeholder="Enter your full address or pick on map"
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        className="flex-grow"
                      />
                      <Button 
                        type="button"
                        variant="outline" 
                        size="icon" 
                        onClick={() => setIsMapModalOpen(true)}
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="receiverNumber">Receiver's Phone Number</Label>
                    <Input 
                      id="receiverNumber" 
                      type="tel" 
                      placeholder="Enter phone number" 
                      value={receiverNumber}
                      onChange={(e) => setReceiverNumber(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <Label>Payment Method</Label>
                  <RadioGroup defaultValue="stripe" value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="stripe" id="stripe" />
                      <Label htmlFor="stripe">Pay with Card (Stripe)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Pay on Delivery</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button 
                  className="w-full rounded-full"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? "Processing..." : "Checkout"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  {paymentMethod === 'stripe' 
                    ? "Secure checkout powered by Stripe" 
                    : "You will pay upon delivery"}
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Map Modal (conditional render on client-side) */}
      {isClient && isMapModalOpen && (
        <MapPickerModal 
          isOpen={isMapModalOpen} 
          onClose={() => setIsMapModalOpen(false)} 
          onLocationSelect={handleLocationSelect} 
        />
      )}

    </PageLayout>
  );
};

export default Cart;
