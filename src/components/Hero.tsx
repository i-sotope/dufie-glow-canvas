
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-background py-20 md:py-28 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight tracking-tight">
              Natural Beauty <br />
              <span className="text-accent-foreground">Amplified</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Discover plant-based skincare rituals that illuminate your natural radiance and inspire confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Our Story
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1562887085-cb16e9276c85?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="Dufie's Skincare products arrangement" 
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-secondary/50 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/30 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Hero;
