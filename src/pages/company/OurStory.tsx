
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const OurStory = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="Our Story" 
        subtitle="The journey of Dufie's Skincare from a kitchen experiment to a global brand."
      />
      
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1564564295391-7f24f26f568b?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Founder of Dufie's Skincare" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-playfair font-bold">Where It All Began</h2>
              <p className="text-muted-foreground">
                Dufie's story begins in 2015 in Accra, Ghana, where founder Adwoa Dufie began 
                blending natural oils and plant extracts passed down through generations of her family.
              </p>
              <p className="text-muted-foreground">
                After struggling with sensitive skin and unable to find products that worked for her, 
                Adwoa started experimenting with traditional botanical remedies in her kitchen, 
                combining ancestral wisdom with modern cosmetic science.
              </p>
              <p className="text-muted-foreground">
                What started as a personal solution soon gained attention from friends and family, 
                who noticed the remarkable difference in Adwoa's skin. Word spread, and demand grew, 
                transforming a passion project into a mission to share these pure formulations with the world.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-playfair font-bold text-center mb-16">Our Journey</h2>
          
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Early days of Dufie's" 
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-playfair font-semibold text-2xl mb-4">2015: Kitchen Beginnings</h3>
                <p className="text-muted-foreground">
                  Dufie's started as handmade batches created in Adwoa's kitchen, 
                  sold at local markets and to friends. The Hydrating Facial Serum - still 
                  our bestseller today - was one of the first formulations.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 md:order-1">
                <h3 className="font-playfair font-semibold text-2xl mb-4">2017: First Store Opening</h3>
                <p className="text-muted-foreground">
                  After two years of growing demand, we opened our first brick-and-mortar store 
                  in Accra, creating a space for customers to experience our products and 
                  learn about botanical skincare.
                </p>
              </div>
              <div className="md:col-span-1 md:order-2">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1604682702345-c4dc1997ba7d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="First Dufie's store" 
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Dufie's lab" 
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-playfair font-semibold text-2xl mb-4">2019: Research & Innovation</h3>
                <p className="text-muted-foreground">
                  We established our dedicated research facility, where we began scientifically 
                  studying traditional botanical ingredients and developing new formulations 
                  that combine ancestral wisdom with modern technology.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 md:order-1">
                <h3 className="font-playfair font-semibold text-2xl mb-4">2021: Global Expansion</h3>
                <p className="text-muted-foreground">
                  Dufie's expanded globally, launching our online store and shipping to customers 
                  around the world. Our commitment to sustainability intensified with the 
                  introduction of our eco-friendly packaging initiative.
                </p>
              </div>
              <div className="md:col-span-1 md:order-2">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1483474496134-7579d5ffc352?q=80&w=911&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Global team" 
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1535957998253-26ae1ef29506?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Today's Dufie's" 
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-playfair font-semibold text-2xl mb-4">Today: A Growing Family</h3>
                <p className="text-muted-foreground">
                  Today, Dufie's is a team of over 50 passionate individuals committed to 
                  creating effective, sustainable skincare that honors both nature and science. 
                  Our products are available in select retailers worldwide, but we maintain the 
                  same dedication to purity and efficacy that started in Adwoa's kitchen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">Our Vision</h2>
          <p className="text-lg text-muted-foreground mb-12">
            We envision a world where skincare is not just about appearance, but about honoring the 
            body's natural processes, embracing the power of plants, and creating sustainable beauty 
            rituals that connect us to nature and to ourselves.
          </p>
          
          <div className="flex justify-center">
            <Button className="rounded-full px-8">
              Join Our Journey
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default OurStory;
