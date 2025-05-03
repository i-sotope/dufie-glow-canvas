
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Hydrating Facial Serum",
    description: "Deeply hydrates and replenishes skin with plant-derived nutrients.",
    price: "$65.00",
    rating: 5,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Rejuvenating Eye Cream",
    description: "Reduces fine lines and dark circles around the delicate eye area.",
    price: "$48.00",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1608968009603-f490b5e3bb5c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Calming Clay Mask",
    description: "Purifies and detoxifies while soothing sensitive skin.",
    price: "$42.00",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Nourishing Night Cream",
    description: "Restores and repairs skin during sleep for morning radiance.",
    price: "$58.00",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    name: "Botanical Cleansing Oil",
    description: "Gently dissolves makeup and impurities without stripping skin.",
    price: "$38.00",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const FeaturedProducts = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 300;
    const newScrollLeft = direction === 'left' 
      ? scrollContainerRef.current.scrollLeft - scrollAmount 
      : scrollContainerRef.current.scrollLeft + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
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
        </div>

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
                  src={product.image} 
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
                  <span className="font-medium">{product.price}</span>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
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
