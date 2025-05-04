
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Filter, X, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Sample product data
const products = [
  {
    id: 1,
    name: "Hydrating Facial Serum",
    description: "Deeply hydrates and replenishes skin with plant-derived nutrients.",
    price: "$65.00",
    rating: 5,
    category: "Serums",
    tags: ["Hydrating", "Anti-aging", "Bestseller"],
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Rejuvenating Eye Cream",
    description: "Reduces fine lines and dark circles around the delicate eye area.",
    price: "$48.00",
    rating: 4.5,
    category: "Eye Care",
    tags: ["Anti-aging", "Brightening"],
    image: "https://images.unsplash.com/photo-1608968009603-f490b5e3bb5c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Calming Clay Mask",
    description: "Purifies and detoxifies while soothing sensitive skin.",
    price: "$42.00",
    rating: 4.8,
    category: "Masks",
    tags: ["Purifying", "Soothing", "Bestseller"],
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Nourishing Night Cream",
    description: "Restores and repairs skin during sleep for morning radiance.",
    price: "$58.00",
    rating: 4.7,
    category: "Moisturizers",
    tags: ["Restorative", "Hydrating", "New"],
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    name: "Botanical Cleansing Oil",
    description: "Gently dissolves makeup and impurities without stripping skin.",
    price: "$38.00",
    rating: 4.9,
    category: "Cleansers",
    tags: ["Gentle", "Hydrating"],
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 6,
    name: "Vitamin C Brightening Serum",
    description: "Fades dark spots and evens skin tone with potent antioxidants.",
    price: "$72.00",
    rating: 4.6,
    category: "Serums",
    tags: ["Brightening", "Anti-aging", "New"],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 7,
    name: "Exfoliating Enzyme Peel",
    description: "Reveals smoother, brighter skin with natural fruit enzymes.",
    price: "$54.00",
    rating: 4.7,
    category: "Exfoliators",
    tags: ["Brightening", "Smoothing"],
    image: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 8,
    name: "Balancing Facial Toner",
    description: "Rebalances pH and preps skin for optimal product absorption.",
    price: "$32.00",
    rating: 4.5,
    category: "Toners",
    tags: ["Balancing", "Hydrating", "Bestseller"],
    image: "https://images.unsplash.com/photo-1563804447127-f4e9ff9e8ce7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

// Filter categories
const categories = ["All", "Cleansers", "Toners", "Serums", "Moisturizers", "Eye Care", "Masks", "Exfoliators"];
const tags = ["All", "Hydrating", "Brightening", "Anti-aging", "Soothing", "Purifying", "Restorative", "Bestseller", "New"];

const AllProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { addToCart, isLoading } = useCart();
  
  const filteredProducts = products.filter(product => {
    const categoryMatch = activeCategory === "All" || product.category === activeCategory;
    const tagMatch = activeTag === "All" || product.tags.includes(activeTag);
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

  const handleAddToCart = (product: any) => {
    // Convert price string to number
    const priceNum = parseFloat(product.price.replace('$', ''));
    addToCart({
      ...product,
      price: priceNum
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
              Showing {filteredProducts.length} of {products.length} products
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
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card 
                key={product.id} 
                className="product-card border-0 bg-background rounded-xl overflow-hidden shadow-sm"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image} 
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
                    <span className="font-medium">{product.price}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full"
                      onClick={() => handleAddToCart(product)}
                      disabled={isLoading}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AllProducts;
