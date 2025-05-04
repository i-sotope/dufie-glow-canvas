
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, isLoading } = useCart();
  const { user } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please sign in to checkout");
      return;
    }
    
    setCheckoutLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      toast.success("Order placed successfully!");
      clearCart();
      setCheckoutLoading(false);
    }, 1500);
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
                      <TableRow key={item.product_id}>
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
                              onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
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
                            onClick={() => removeFromCart(item.product_id)}
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
                
                <div className="space-y-4">
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
                
                <Button 
                  className="w-full mt-6 rounded-full"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? "Processing..." : "Checkout"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Cart;
