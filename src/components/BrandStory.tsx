
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BrandStory = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1 reveal">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold">
              Thoughtfully selected, <br />
              <span className="text-accent-foreground">beautifully presented</span>
            </h2>
            <p className="text-muted-foreground">
              At Dufie's Gifts, we believe that giving is an art. Our carefully curated gift collections 
              combine quality products with personalized touches to create meaningful experiences 
              for both givers and receivers.
            </p>
            <p className="text-muted-foreground">
              Each gift is lovingly selected, elegantly wrapped, and delivered with care, ensuring 
              that every unwrapping moment becomes a cherished memory that strengthens the bonds 
              between people.
            </p>
            <div className="pt-4">
              <Button className="rounded-full px-8">
                Our Philosophy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-[500px] order-1 md:order-2">
            <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1170&auto=format&fit=crop" 
                alt="Elegant gift wrapping with ribbons" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-xl overflow-hidden border-4 border-background">
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1160&auto=format&fit=crop" 
                alt="Luxury gift box being prepared" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
