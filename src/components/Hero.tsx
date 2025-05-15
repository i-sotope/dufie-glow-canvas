
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
              Thoughtful Gifts <br />
              <span className="text-primary">For Every Occasion</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              We curate, wrap, and deliver meaningful gifts that celebrate special moments and strengthen your relationships with loved ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8">
                Browse Gifts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                How It Works
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden">
            <img 
              src="https://pngtree.com/freepng/a-gift-box-ribbon-wrapped-gift-box-purple-ribbon-banded-gift-box-gift-box_3895690.html" 
              alt="Beautifully wrapped gift boxes with ribbons" 
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
