
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emma Thompson",
    role: "Loyal Customer",
    content: "The Hydrating Facial Serum has transformed my skin completely. After just two weeks, my complexion is noticeably more radiant and even-toned. I've never received so many compliments on my skin!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Skincare Enthusiast",
    content: "As someone with sensitive skin, finding products that don't cause irritation is challenging. Dufie's Calming Clay Mask is gentle yet effective—it soothes redness and leaves my skin feeling refreshed without any tightness.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Beauty Blogger",
    content: "I've tried countless night creams, but Dufie's Nourishing Night Cream stands above the rest. The texture is luxurious, it absorbs beautifully, and I wake up to plump, hydrated skin every morning.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    // Automatically cycle through testimonials
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

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
    <section className="py-20 bg-accent/10">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-16 reveal">
          What Our Customers Say
        </h2>
        
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                className={`border-0 shadow-md transition-all duration-500 p-6 bg-background ${
                  index === activeIndex ? 'scale-105 shadow-lg z-10' : 'opacity-80'
                }`}
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 mx-1 rounded-full transition-all ${
                index === activeIndex ? 'bg-primary' : 'bg-muted'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
