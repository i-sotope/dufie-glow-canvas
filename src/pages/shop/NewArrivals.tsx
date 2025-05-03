
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

// Sample new arrivals product data
const newArrivalsProducts = [
  {
    id: 6,
    name: "Vitamin C Brightening Serum",
    description: "Fades dark spots and evens skin tone with potent antioxidants.",
    price: "$72.00",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    launch: "New for Spring 2023"
  },
  {
    id: 4,
    name: "Nourishing Night Cream",
    description: "Restores and repairs skin during sleep for morning radiance.",
    price: "$58.00",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3",
    launch: "Just Launched"
  },
  {
    id: 9,
    name: "Rose Quartz Facial Roller",
    description: "Natural stone facial massage tool to reduce puffiness and enhance product absorption.",
    price: "$28.00",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1562616293-1a11a7816903?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3",
    launch: "New Addition"
  },
  {
    id: 10,
    name: "Antioxidant Day Cream SPF30",
    description: "Protects against environmental damage while providing all-day moisture.",
    price: "$62.00",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1042&auto=format&fit=crop&ixlib=rb-4.0.3",
    launch: "Just Released"
  }
];

const NewArrivals = () => {
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

  return (
    <PageLayout>
      <PageHeader 
        title="New Arrivals" 
        subtitle="Discover our latest innovations in plant-based skincare."
      />
      
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivalsProducts.map((product) => (
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
                    <span className="text-xs text-accent-foreground font-medium">
                      {product.launch}
                    </span>
                  </div>
                  <h3 className="font-playfair font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-medium">{product.price}</span>
                    <Button variant="outline" size="sm" className="rounded-full">
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium">
                  New
                </div>
              </Card>
            ))}
          </div>
          
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
