import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

// Define Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image_url: string;
}

const Bestsellers = () => {
  const { addToCart, isLoading: isCartLoading } = useCart();

  // Add state for products, loading, error
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch bestsellers on mount
  useEffect(() => {
    const fetchBestsellers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Query for bestsellers - order by rating desc, limit to 4 (adjust as needed)
        const { data, error: dbError } = await supabase
          .from('products')
          // Select columns - remove 'reviews'
          .select('id, name, description, price, rating, image_url') 
          // Add filtering logic if applicable (e.g., .eq('tag', 'Bestseller'))
          .order('rating', { ascending: false }) 
          .limit(4);

        if (dbError) {
          throw dbError;
        }
        setProducts(data as Product[] || []);
      } catch (err: any) {
        console.error("Error fetching bestsellers:", err);
        setError("Failed to load bestsellers.");
        toast.error("Failed to load bestsellers.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestsellers();
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

  const handleAddToCart = (product: Product) => {
    addToCart({
      product_id: product.id,
      gift_set_id: null,
      quantity: 1,
      name: product.name,
      price: product.price,
      image: product.image_url
    });
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Bestsellers" 
        subtitle="Our most loved products, trusted and reviewed by thousands of customers."
      />
      
      <div className="container py-16">
        {/* Loading State */}
        {isLoading && <p className="text-center">Loading bestsellers...</p>}
        
        {/* Error State */}
        {error && <p className="text-center text-destructive">{error}</p>}

        {/* No Products State */}
        {!isLoading && !error && products.length === 0 && (
          <p className="text-center text-muted-foreground">No bestsellers found.</p>
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
                    src={product.image_url}
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      {renderStars(product.rating)}
                    </div>
                  </div>
                  <h3 className="font-playfair font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full"
                      onClick={() => handleAddToCart(product)}
                      disabled={isCartLoading}
                    >
                      {isCartLoading ? 'Adding...' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-medium">
                  Bestseller
                </div>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-16">
          <h2 className="text-2xl font-playfair font-bold mb-6">Why Our Bestsellers Stand Out</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold text-lg mb-3">Pure Ingredients</h3>
              <p className="text-muted-foreground">
                Our bestsellers contain only the highest quality botanical ingredients, 
                carefully sourced and ethically harvested for maximum efficacy.
              </p>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold text-lg mb-3">Proven Results</h3>
              <p className="text-muted-foreground">
                Each bestseller has been rigorously tested and praised by customers
                for delivering visible improvements to skin health and appearance.
              </p>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold text-lg mb-3">Sustainable Formulas</h3>
              <p className="text-muted-foreground">
                Every bestselling product reflects our commitment to environmental
                responsibility, from ingredients to packaging and production methods.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Bestsellers;
