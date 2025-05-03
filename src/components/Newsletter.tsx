
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Thank you for subscribing!",
        description: "You've been added to our newsletter list.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-muted/50 py-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-10 reveal">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Subscribe for exclusive offers, skincare tips, and be the first to know about new product launches.
          </p>
        </div>
        
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full"
            required
          />
          <Button 
            type="submit" 
            className="rounded-full px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          By subscribing, you agree to our Privacy Policy. We treat your data with care.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
