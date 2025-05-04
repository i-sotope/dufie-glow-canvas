
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Sample bestselling product data
const bestsellerProducts = [
  {
    id: 1,
    name: "Hydrating Facial Serum",
    description: "Deeply hydrates and replenishes skin with plant-derived nutrients.",
    price: "$65.00",
    rating: 5,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Calming Clay Mask",
    description: "Purifies and detoxifies while soothing sensitive skin.",
    price: "$42.00",
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 8,
    name: "Balancing Facial Toner",
    description: "Rebalances pH and preps skin for optimal product absorption.",
    price: "$32.00",
    rating: 4.5,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1563804447127-f4e9ff9e8ce7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    name: "Botanical Cleansing Oil",
    description: "Gently dissolves makeup and impurities without stripping skin.",
    price: "$38.00",
    rating: 4.9,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const Bestsellers = () => {
  const { addToCart, isLoading } = useCart();
  
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
        title="Bestsellers" 
        subtitle="Our most loved products, trusted and reviewed by thousands of customers."
      />
      
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellerProducts.map((product) => (
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
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.reviews} reviews
                  </span>
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
              <div className="absolute top-3 left-3 bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-medium">
                Bestseller
              </div>
            </Card>
          ))}
        </div>
        
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
