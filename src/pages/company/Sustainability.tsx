
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BadgeCheck, Leaf, Recycle, Droplets } from "lucide-react";

const Sustainability = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="Our Sustainability Commitment" 
        subtitle="How we're working to protect the planet while creating effective skincare."
      />
      
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-6">Sustainability at Our Core</h2>
              <p className="text-muted-foreground mb-4">
                At Dufie's, sustainability isn't just a buzzword—it's integrated into every aspect 
                of our business. From ingredient sourcing to manufacturing processes to packaging 
                decisions, we constantly evaluate our environmental impact and seek ways to minimize it.
              </p>
              <p className="text-muted-foreground">
                We believe that beautiful skin and a beautiful planet go hand in hand, and we're 
                committed to creating products that nourish both. Our approach centers on three key 
                principles: responsible sourcing, minimal processing, and circular thinking.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Sustainable ingredients" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-accent/10">
        <div className="container">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Our Initiatives</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-sm p-8">
              <div className="flex gap-6">
                <div className="bg-secondary rounded-full p-4 h-fit">
                  <Leaf className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-4">Ethical Sourcing</h3>
                  <p className="text-muted-foreground mb-4">
                    We work directly with farmers and cooperatives to ensure fair wages and 
                    sustainable harvesting practices. 80% of our botanical ingredients are 
                    certified organic and wild-harvested using traditional methods that 
                    promote biodiversity.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Direct relationships with ingredient producers</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Fair Trade certified partnerships</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Regenerative farming support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <Card className="border-0 shadow-sm p-8">
              <div className="flex gap-6">
                <div className="bg-secondary rounded-full p-4 h-fit">
                  <Droplets className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-4">Low-Impact Manufacturing</h3>
                  <p className="text-muted-foreground mb-4">
                    Our production facility runs on 100% renewable energy, and we utilize 
                    water-saving technologies that reduce our consumption by 60% compared 
                    to industry standards. Our extraction methods preserve the potency of 
                    ingredients while minimizing waste.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Solar-powered production facility</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Closed-loop water recycling system</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Zero-waste manufacturing target by 2025</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <Card className="border-0 shadow-sm p-8">
              <div className="flex gap-6">
                <div className="bg-secondary rounded-full p-4 h-fit">
                  <Recycle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-4">Circular Packaging</h3>
                  <p className="text-muted-foreground mb-4">
                    We're transitioning all our packaging to post-consumer recycled materials, 
                    biodegradable alternatives, or reusable containers. Our refill program 
                    allows customers to replenish their favorite products while reducing packaging waste.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>85% plastic-free packaging</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Refill stations in flagship stores</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Take-back program for container recycling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <Card className="border-0 shadow-sm p-8">
              <div className="flex gap-6">
                <div className="bg-secondary rounded-full p-4 h-fit">
                  <Leaf className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-4">Conservation Partnerships</h3>
                  <p className="text-muted-foreground mb-4">
                    We donate 2% of all profits to conservation initiatives that protect 
                    biodiversity and traditional botanical knowledge. Our partnerships focus on 
                    preserving the ecosystems where our ingredients originate.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Rainforest conservation project in Ghana</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Traditional knowledge documentation program</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Annual beach clean-up initiatives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">Our Sustainability Goals</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We're continuously working to improve our environmental footprint. 
              Here's what we're striving toward in the coming years:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-xl font-playfair font-semibold mb-3">2025</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>100% plastic-free packaging</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>Zero waste manufacturing</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>Carbon-neutral shipping</span>
                </li>
              </ul>
            </Card>
            
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-xl font-playfair font-semibold mb-3">2027</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>Full ingredient traceability system</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>Refill stations in all partner locations</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>50% reduction in water usage</span>
                </li>
              </ul>
            </Card>
            
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-xl font-playfair font-semibold mb-3">2030</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>Carbon-positive operations</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>100% regenerative-sourced ingredients</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>Circular business model implementation</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">Join Our Sustainability Journey</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We invite our customers to participate in our sustainability efforts through our container 
            return program, refill initiatives, and community clean-up events. Together, we can 
            create beauty rituals that respect and protect our planet.
          </p>
          <Button className="rounded-full px-8">Learn How You Can Help</Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Sustainability;
