
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
              <span className="text-inherit">For Every Occasion</span>
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

          {/* Hero Image - SVG Gift Boxes */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <style>
                {`.box { rx: 10; ry: 10; }
                .ribbon-vert, .ribbon-horiz { opacity: 0.8; }
                .bow { opacity: 0.9; }`}
              </style>

              {/* Top-left Box (Peach) */}
              <rect x="30" y="30" width="200" height="200" className="box" fill="#e9c5a7"/>
              <rect x="120" y="30" width="20" height="200" className="ribbon-vert" fill="#dcb275"/>
              <rect x="30" y="120" width="200" height="20" className="ribbon-horiz" fill="#dcb275"/>
              <path className="bow" fill="#dcb275"
                d="M130 130 
                   c -30 -30, -50 -10, -20 20 
                   c -30 30, -10 50, 20 20 
                   c 30 30, 50 10, 20 -20 
                   c 30 -30, 10 -50, -20 -20 z"/>

              {/* Top-right Box (Red) */}
              <rect x="310" y="30" width="200" height="200" className="box" fill="#a31e1e"/>
              <rect x="400" y="30" width="20" height="200" className="ribbon-vert" fill="#820e0e"/>
              <rect x="310" y="120" width="200" height="20" className="ribbon-horiz" fill="#820e0e"/>
              <path className="bow" fill="#820e0e"
                d="M410 130 
                   c -30 -30, -50 -10, -20 20 
                   c -30 30, -10 50, 20 20 
                   c 30 30, 50 10, 20 -20 
                   c 30 -30, 10 -50, -20 -20 z"/>

              {/* Bottom-left Box (Gold) */}
              <rect x="30" y="310" width="200" height="200" className="box" fill="#d9b56e"/>
              <rect x="120" y="310" width="20" height="200" className="ribbon-vert" fill="#c89a50"/>
              <rect x="30" y="400" width="200" height="20" className="ribbon-horiz" fill="#c89a50"/>
              <path className="bow" fill="#c89a50"
                d="M130 410 
                   c -30 -30, -50 -10, -20 20 
                   c -30 30, -10 50, 20 20 
                   c 30 30, 50 10, 20 -20 
                   c 30 -30, 10 -50, -20 -20 z"/>

              {/* Bottom-right Box (Ivory) */}
              <rect x="310" y="310" width="200" height="200" className="box" fill="#f1ece2"/>
              <rect x="400" y="310" width="20" height="200" className="ribbon-vert" fill="#ddd8ce"/>
              <rect x="310" y="400" width="200" height="20" className="ribbon-horiz" fill="#ddd8ce"/>
              <path className="bow" fill="#ddd8ce"
                d="M410 410 
                   c -30 -30, -50 -10, -20 20 
                   c -30 30, -10 50, 20 20 
                   c 30 30, 50 10, 20 -20 
                   c 30 -30, 10 -50, -20 -20 z"/>
            </svg>
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
