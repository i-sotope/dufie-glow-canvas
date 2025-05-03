
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BrandStory = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1 reveal">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold">
              Pure ingredients, <br />
              <span className="text-accent-foreground">exceptional results</span>
            </h2>
            <p className="text-muted-foreground">
              At Dufie's Skincare, we believe beauty comes from purity. Our formulations 
              combine the wisdom of traditional botanical remedies with modern cosmetic science to 
              create products that work in harmony with your skin's natural processes.
            </p>
            <p className="text-muted-foreground">
              Each ingredient is carefully sourced, ethically harvested, and meticulously tested 
              to ensure the highest quality and efficacy without compromising our commitment to sustainability.
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
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Natural skincare ingredients" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-xl overflow-hidden border-4 border-background">
              <img 
                src="https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Skincare formulation process" 
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
