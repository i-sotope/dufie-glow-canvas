import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Filter, X, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

// Define Product interface (ensure it matches your DB schema)
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image_url: string;
  category: string; // Needed for filtering
  tags: string[];   // Needed for filtering
}

// Remove sample product data
// const products = [ ... ];

// Keep hardcoded filters for now, could be fetched later
const categories = ["All", "Cleansers", "Toners", "Serums", "Moisturizers", "Eye Care", "Masks", "Exfoliators"];
const tags = ["All", "Hydrating", "Brightening", "Anti-aging", "Soothing", "Purifying", "Restorative", "Bestseller", "New"];

const AllProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { addToCart, isLoading: isCartLoading } = useCart();

  // Add state for products, loading, error
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch all products - select columns needed for display and filtering
        const { data, error: dbError } = await supabase
          .from('products')
          .select('id, name, description, price, rating, image_url, category, tags'); 

        if (dbError) {
          throw dbError;
        }
        setAllProducts(data as Product[] || []);
      } catch (err: any) {
        console.error("Error fetching all products:", err);
        setError("Failed to load products.");
        toast.error("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);
  
  // Apply filtering to the fetched products
  const filteredProducts = allProducts.filter(product => {
    // Ensure product.tags is an array before calling includes
    const tagsArray = Array.isArray(product.tags) ? product.tags : []; 
    const categoryMatch = activeCategory === "All" || product.category === activeCategory;
    const tagMatch = activeTag === "All" || tagsArray.includes(activeTag);
    return categoryMatch && tagMatch;
  });

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
        title="All Products" 
        subtitle="Discover our complete collection of plant-based skincare solutions."
      />
      
      <div className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-muted-foreground">
              {!isLoading && `Showing ${filteredProducts.length} of ${allProducts.length} products`}
              {isLoading && 'Loading products...'}
            </p>
          </div>
          
          {/* Mobile filter toggle */}
          <Button 
            variant="outline" 
            className="flex items-center md:hidden"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block col-span-1">
            <div className="space-y-8">
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  Categories
                  <ChevronDown className="ml-2 h-4 w-4" />
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`text-sm block w-full text-left py-1 ${
                        activeCategory === category 
                          ? 'font-medium text-foreground' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  Product Tags
                  <ChevronDown className="ml-2 h-4 w-4" />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      className={`text-xs px-3 py-1 rounded-full ${
                        activeTag === tag 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                      }`}
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {isMobileFilterOpen && (
            <div className="md:hidden fixed inset-0 bg-background z-50 p-6 overflow-auto">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-medium">Filters</h3>
                <Button variant="ghost" onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button 
                        key={category}
                        className={`text-sm block w-full text-left py-2 ${
                          activeCategory === category 
                            ? 'font-medium text-foreground' 
                            : 'text-muted-foreground'
                        }`}
                        onClick={() => {
                          setActiveCategory(category);
                          setIsMobileFilterOpen(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Product Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        className={`text-xs px-3 py-1 rounded-full ${
                          activeTag === tag 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                        onClick={() => {
                          setActiveTag(tag);
                          setIsMobileFilterOpen(false);
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="col-span-1 md:col-span-3">
            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="h-96 animate-pulse bg-muted"></Card>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && <p className="text-destructive text-center">{error}</p>}

            {/* No Products State */}
            {!isLoading && !error && filteredProducts.length === 0 && (
              <p className="text-muted-foreground text-center">No products match your filters.</p>
            )}

            {/* Render Products */}
            {!isLoading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
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
                      <div className="flex items-center space-x-1">
                        {renderStars(product.rating)}
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
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AllProducts;
