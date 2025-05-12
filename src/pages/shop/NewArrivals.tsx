import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

// Define Product interface (assuming similar structure)
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number; // Assuming rating is available
  image_url: string;
  created_at?: string; // Optional: if sorting by creation time
  // launch?: string; // Remove launch
}

const NewArrivals = () => {
  const { addToCart, isLoading: isCartLoading } = useCart();
  
  // Add state for products, loading, error
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchNewArrivals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Query for new arrivals - sort by created_at desc, limit to 4 (adjust as needed)
        const { data, error: dbError } = await supabase
          .from('products')
          // Select relevant columns - ensure 'rating', 'image_url', 'launch' exist
          .select('id, name, description, price, rating, image_url, created_at') 
          // Add filtering logic if applicable (e.g., .eq('tag', 'New'))
          .order('created_at', { ascending: false }) // Or use a specific 'new_arrival' flag/date
          .limit(4);

        if (dbError) {
          throw dbError;
        }
        setProducts(data as Product[] || []);
      } catch (err: any) {
        console.error("Error fetching new arrivals:", err);
        setError("Failed to load new arrivals.");
        toast.error("Failed to load new arrivals.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'fill-primary text-primary' 
            : i < rating 
              ? 'fill-primary/50 text-primary' 
              : 'text-muted'
        }`}
      />
    ));
  };

  // Adjust handleAddToCart for numeric price
  const handleAddToCart = (product: Product) => {
    // Pass the correct structure expected by CartContext
    addToCart({
      product_id: product.id,
      gift_set_id: null, // Explicitly null for products
      quantity: 1,
       // Pass other details needed by CartContext (name, price, image)
      name: product.name,
      price: product.price,
      image: product.image_url
    });
  };

  return (
    <PageLayout>
      <PageHeader 
        title="New Arrivals" 
        subtitle="Discover our latest innovations in plant-based skincare."
      />
      
      <section className="py-16">
        <div className="container">
          {/* Loading State */}
          {isLoading && <p className="text-center">Loading new arrivals...</p>}
          
          {/* Error State */}
          {error && <p className="text-center text-destructive">{error}</p>}

          {/* No Products State */}
          {!isLoading && !error && products.length === 0 && (
            <p className="text-center text-muted-foreground">No new arrivals found.</p>
          )}

          {/* Products Grid */}
          {!isLoading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Card 
                  key={product.id} 
                  className="product-card border-0 bg-background rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={product.image_url} // Use image_url
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        {renderStars(product.rating)} {/* Use fetched rating */}
                      </div>
                      {/* Remove launch info rendering */}
                      {/* {product.launch && (
                        <span className="text-xs text-accent-foreground font-medium">
                          {product.launch}
                        </span>
                      )} */}
                    </div>
                    <h3 className="font-playfair font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-medium">${product.price.toFixed(2)}</span> {/* Use fetched price */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-full"
                        onClick={() => handleAddToCart(product)}
                        disabled={isCartLoading} // Use isCartLoading
                      >
                        {isCartLoading ? 'Adding...' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium">
                    New
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Creating new formulations"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-playfair font-bold">Innovation Process</h2>
                <p className="text-muted-foreground">
                  At Dufie's, our new arrivals are the result of extensive research and 
                  development combining traditional botanical knowledge with cutting-edge 
                  cosmetic science.
                </p>
                <p className="text-muted-foreground">
                  Each new product undergoes rigorous testing and refinement before joining 
                  our collection, ensuring it meets our high standards of efficacy, 
                  sustainability, and sensory experience.
                </p>
                <p className="text-muted-foreground">
                  We introduce new formulations seasonally, responding to evolving skincare 
                  needs and incorporating the latest advancements in natural ingredients.
                </p>
                <Button className="rounded-full">Learn About Our Process</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NewArrivals;
