
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="About Dufie's" 
        subtitle="A journey rooted in nature, powered by science."
      />

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At Dufie's, we believe that true beauty comes from purity and balance. Our mission is to create 
                skincare that works in harmony with your body's natural processes, using the finest botanical 
                ingredients that nature has to offer.
              </p>
              <p className="text-muted-foreground">
                Every product is thoughtfully formulated to nourish your skin while respecting our planet, 
                creating a sustainable cycle of beauty that benefits all.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Dufie's skincare ingredients" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-playfair font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold text-xl mb-4">Purity</h3>
              <p className="text-muted-foreground">
                We source the purest ingredients, free from harmful chemicals, artificial fragrances, 
                and synthetic additives that can disrupt your skin's natural balance.
              </p>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold text-xl mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                From ethical sourcing to eco-friendly packaging, we're committed to minimizing our 
                environmental footprint at every step of our production process.
              </p>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold text-xl mb-4">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in full disclosure about what goes into our products and how they're made, 
                empowering you to make informed choices about your skincare.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">Our Founder's Story</h2>
          <div className="mb-8 w-40 h-40 rounded-full overflow-hidden mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="Founder of Dufie's Skincare" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-muted-foreground mb-6">
            Dufie's was born from my personal struggle with sensitive skin and the frustration of not finding products 
            that were both effective and gentle. After years of research into traditional botanical remedies and modern 
            cosmetic science, I created formulations that transformed my skin – and I knew I had to share them with the world.
          </p>
          <p className="text-muted-foreground mb-8">
            Today, our team combines ancestral wisdom with scientific innovation to create products that respect your skin's 
            natural processes while delivering visible results. Every bottle represents our commitment to your skin health 
            and our planet's wellbeing.
          </p>
          <p className="font-playfair text-lg italic">- Adwoa Dufie, Founder</p>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
