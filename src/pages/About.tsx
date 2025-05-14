
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="About Dufie's Gifts" 
        subtitle="A journey guided by connection, celebration, and the joy of giving."
      />

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At Dufie's Gifts, we believe that thoughtful giving creates meaningful connections. Our mission is to 
                curate exceptional gifts that celebrate special moments and strengthen the bonds between people.
              </p>
              <p className="text-muted-foreground">
                Every gift in our collection is thoughtfully selected to delight recipients and reflect the care 
                and consideration of the giver, creating lasting memories that transcend the gift itself.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1170&auto=format&fit=crop" 
                alt="Elegant gift wrapping with ribbons" 
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
              <h3 className="font-playfair font-semibold text-xl mb-4">Thoughtfulness</h3>
              <p className="text-muted-foreground">
                We believe in the power of thoughtful giving. Each gift in our collection is carefully 
                selected for its quality, meaningfulness, and ability to create joy.
              </p>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold text-xl mb-4">Connection</h3>
              <p className="text-muted-foreground">
                Our gifts are designed to strengthen bonds between people, celebrating relationships 
                and creating moments of connection that last well beyond the unwrapping.
              </p>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold text-xl mb-4">Celebration</h3>
              <p className="text-muted-foreground">
                We honor life's special moments, both big and small, with gifts that elevate 
                celebrations and turn ordinary days into extraordinary memories.
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
              alt="Founder of Dufie's Gifts" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-muted-foreground mb-6">
            Dufie's Gifts began with a simple realization: gift-giving should be as meaningful for the giver as it is 
            joyful for the receiver. After struggling to find thoughtful gifts that truly celebrated the special people 
            in my life, I set out to create a collection that would make it easier to express care through perfectly 
            curated gifts.
          </p>
          <p className="text-muted-foreground mb-8">
            Today, our team works tirelessly to source unique items, craft beautiful presentations, and create gifting 
            experiences that strengthen connections and create moments of genuine joy. Every gift we curate is selected 
            with the understanding that it represents not just an item, but an expression of the relationship it celebrates.
          </p>
          <p className="font-playfair text-lg italic">- Adwoa Dufie, Founder</p>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
