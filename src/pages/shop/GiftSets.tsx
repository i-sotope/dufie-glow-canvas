
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Gift, ArrowRight } from "lucide-react";

// Sample gift sets data
const giftSets = [
  {
    id: 1,
    name: "Essential Hydration Collection",
    description: "A complete hydration ritual for all skin types featuring our bestselling serum, moisturizer, and face mist.",
    price: "$120.00",
    originalPrice: "$145.00",
    rating: 5,
    image: "https://images.unsplash.com/photo-1583303585142-3e93dbd4cb5a?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3",
    contents: ["Hydrating Facial Serum", "Nourishing Day Cream", "Balancing Face Mist"]
  },
  {
    id: 2,
    name: "Radiance Revival Kit",
    description: "Restore your natural glow with this brightening collection of vitamin-rich formulations.",
    price: "$145.00",
    originalPrice: "$180.00",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1627875777089-287caf5b3672?q=80&w=1570&auto=format&fit=crop&ixlib=rb-4.0.3",
    contents: ["Vitamin C Brightening Serum", "Exfoliating Enzyme Peel", "Antioxidant Day Cream"]
  },
  {
    id: 3,
    name: "Overnight Restoration Set",
    description: "Wake up to revitalized skin with this powerful nighttime treatment collection.",
    price: "$95.00",
    originalPrice: "$115.00",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1608248642538-402346968285?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    contents: ["Nourishing Night Cream", "Rejuvenating Eye Cream", "Overnight Recovery Mask"]
  },
  {
    id: 4,
    name: "Complete Cleansing Ritual",
    description: "A comprehensive cleansing system to purify and prepare skin morning and night.",
    price: "$85.00",
    originalPrice: "$105.00",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    contents: ["Botanical Cleansing Oil", "Gentle Foaming Cleanser", "Balancing Facial Toner"]
  }
];

const GiftSets = () => {
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

  // Calculate savings percentage
  const calculateSavings = (original: string, current: string) => {
    const originalPrice = parseFloat(original.replace("$", ""));
    const currentPrice = parseFloat(current.replace("$", ""));
    const savingsPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    return savingsPercent;
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Gift Sets" 
        subtitle="Curated collections that make perfect gifts—for others or yourself."
      />
      
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {giftSets.map((set) => (
              <Card 
                key={set.id} 
                className="border-0 bg-background rounded-xl overflow-hidden shadow-sm product-card"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="h-full">
                    <img 
                      src={set.image} 
                      alt={set.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(set.rating)}
                      </div>
                      <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
                        Save {calculateSavings(set.originalPrice, set.price)}%
                      </span>
                    </div>
                    
                    <h3 className="font-playfair font-semibold text-xl mb-2">{set.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{set.description}</p>
                    
                    <div className="mb-4 flex-grow">
                      <h4 className="text-sm font-medium mb-2">Includes:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {set.contents.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <Gift className="h-3 w-3 mr-2 text-accent-foreground" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-lg">{set.price}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {set.originalPrice}
                        </span>
                      </div>
                      <Button size="sm" className="rounded-full">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Custom Gift Sets */}
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
