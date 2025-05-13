
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const OurStory = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="Our Story" 
        subtitle="The journey of Dufie's Gifts from a kitchen table idea to a global gifting service."
      />
      
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1564564295391-7f24f26f568b?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Founder of Dufie's Gifts" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-playfair font-bold">Where It All Began</h2>
              <p className="text-muted-foreground">
                Dufie's story begins in 2015 in Accra, Ghana, where founder Adwoa Dufie began 
                crafting thoughtful gift packages that celebrated special occasions with authentic Ghanaian touches.
              </p>
              <p className="text-muted-foreground">
                After struggling to find meaningful gifts for friends and family abroad that truly reflected 
                her culture and personal touch, Adwoa started creating custom gift boxes that combined 
                traditional elements with modern presentation.
              </p>
              <p className="text-muted-foreground">
                What started as a personal mission soon gained attention from friends and family, 
                who marveled at the thoughtfulness and uniqueness of her gift selections. Word spread, and demand grew, 
                transforming a passion project into a mission to elevate the art of gifting worldwide.
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
                    src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1170&auto=format&fit=crop" 
                    alt="Early days of Dufie's" 
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-playfair font-semibold text-2xl mb-4">2015: Kitchen Table Beginnings</h3>
                <p className="text-muted-foreground">
                  Dufie's started as handcrafted gift boxes created on Adwoa's kitchen table, 
                  sold at local markets and to friends. The Celebration Gift Box - still 
                  our bestseller today - was one of the first creations.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 md:order-1">
                <h3 className="font-playfair font-semibold text-2xl mb-4">2017: First Boutique Opening</h3>
                <p className="text-muted-foreground">
                  After two years of growing demand, we opened our first brick-and-mortar gift boutique 
                  in Accra, creating a space for customers to experience our curated collections 
                  and receive personalized gift consultations.
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
                    src="https://images.unsplash.com/photo-1607344645866-009cdf0f7393?q=80&w=987&auto=format&fit=crop" 
                    alt="Dufie's gift workshop" 
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-playfair font-semibold text-2xl mb-4">2019: Expanding Our Offerings</h3>
                <p className="text-muted-foreground">
                  We established our dedicated gift design studio, where we began partnering with artisans 
                  from around the world to develop exclusive products that couldn't be found elsewhere. 
                  Our corporate gifting program was also launched this year.
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
                    src="https://images.unsplash.com/photo-1608286938291-3ce339da4fb4?q=80&w=987&auto=format&fit=crop" 
                    alt="Today's Dufie's" 
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-playfair font-semibold text-2xl mb-4">Today: A Growing Family</h3>
                <p className="text-muted-foreground">
                  Today, Dufie's is a team of over 50 passionate gift curators committed to 
                  creating meaningful gifting experiences that celebrate life's special moments. 
                  Our gifts are available in select retailers worldwide, but we maintain the 
                  same dedication to personal touches that started at Adwoa's kitchen table.
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
            We envision a world where every gift is a meaningful expression of connection, 
            thoughtfully selected to celebrate relationships and create lasting memories. 
            We believe in the power of gifting to strengthen bonds and bring joy to both 
            the giver and receiver.
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
