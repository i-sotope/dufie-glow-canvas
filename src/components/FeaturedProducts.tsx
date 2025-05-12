import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image_url: string;
}

const FeaturedProducts = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { addToCart, isLoading: isCartLoading } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
          .from('products')
          .select('id, name, description, price, rating, image_url')
          .order('rating', { ascending: false })
          .limit(5);

        if (dbError) {
          throw dbError;
        }

        if (data) {
          setProducts(data as Product[]);
          setTimeout(checkScrollability, 0);
        } else {
          setProducts([]);
        }
      } catch (err: any) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load featured products.");
        toast.error("Failed to load featured products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const tolerance = 1;
    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - tolerance);
  };

  useEffect(() => {
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 300;
    const currentScrollLeft = scrollContainerRef.current.scrollLeft;
    const maxScrollLeft = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

    let newScrollLeft;
    if (direction === 'left') {
      newScrollLeft = Math.max(0, currentScrollLeft - scrollAmount);
    } else {
      newScrollLeft = Math.min(maxScrollLeft, currentScrollLeft + scrollAmount);
    }
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    setTimeout(() => {
        setCanScrollLeft(newScrollLeft > 0);
        setCanScrollRight(newScrollLeft < maxScrollLeft);
    }, 350);
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
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 reveal">
              Bestselling Products
            </h2>
            <p className="text-muted-foreground max-w-md">
              Crafted with organic botanicals and pure ingredients for all skin types.
            </p>
          </div>
          
          {!isLoading && !error && products.length > 3 && (
            <div className="flex space-x-3 mt-6 md:mt-0">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                disabled={!canScrollLeft}
                onClick={() => scroll('left')}
                aria-label="Scroll left"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                disabled={!canScrollRight}
                onClick={() => scroll('right')}
                aria-label="Scroll right"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-60"> 
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex justify-center items-center h-60">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div 
            className="flex space-x-6 overflow-x-auto pb-8 scrollbar-none -mx-4 px-4"
            onScroll={checkScrollability} 
            ref={scrollContainerRef}
          >
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="min-w-[280px] md:min-w-[320px] product-card border-0 bg-background rounded-xl overflow-hidden shadow-sm"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image_url}
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-primary text-primary' 
                            : i < product.rating 
                              ? 'fill-primary/50 text-primary' 
                              : 'text-muted'
                        }`}
                      />
                    ))}
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
              </Card>
            ))}
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="flex justify-center items-center h-60">
            <p className="text-muted-foreground">No featured products found.</p>
          </div>
        )}
        
        <div className="text-center mt-10">
          <Button variant="default" size="lg" className="rounded-full px-8">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
