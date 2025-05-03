
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, FileText, Mail } from "lucide-react";

// Sample press releases
const pressReleases = [
  {
    id: 1,
    title: "Dufie's Skincare Launches New Vitamin C Brightening Line",
    date: "April 15, 2023",
    excerpt: "Dufie's Skincare is proud to announce the launch of its new Vitamin C Brightening Collection, featuring ethically sourced botanical extracts with powerful antioxidant properties.",
    category: "Product Launch"
  },
  {
    id: 2,
    title: "Founder Adwoa Dufie Named 'Entrepreneur of the Year'",
    date: "March 10, 2023",
    excerpt: "Adwoa Dufie, founder of Dufie's Skincare, has been recognized as 'Entrepreneur of the Year' by the African Sustainable Business Association for her commitment to ethical sourcing and empowering local communities.",
    category: "Award"
  },
  {
    id: 3,
    title: "Dufie's Skincare Expands European Distribution",
    date: "February 22, 2023",
    excerpt: "Dufie's Skincare announces expansion into major European markets, partnering with premium retailers across France, Germany, and the UK to bring its plant-based formulations to European consumers.",
    category: "Business"
  },
  {
    id: 4,
    title: "New Sustainable Packaging Initiative Announced",
    date: "January 15, 2023",
    excerpt: "Dufie's Skincare unveils its ambitious plan to transition to 100% plastic-free packaging by 2025, starting with the introduction of refillable glass containers and compostable shipping materials.",
    category: "Sustainability"
  }
];

// Sample media features
const mediaFeatures = [
  {
    id: 1,
    publication: "Vogue",
    title: "The Clean Beauty Brands Making Waves in 2023",
    excerpt: "Dufie's Skincare stands out for its commitment to both efficacy and sustainability, offering formulations that deliver visible results without compromising environmental values.",
    date: "March 2023",
    image: "https://images.unsplash.com/photo-1501761095094-94d36f57edbb?q=80&w=3415&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    publication: "Elle",
    title: "How This Founder is Revolutionizing Ethical Skincare",
    excerpt: "Adwoa Dufie's journey from kitchen experiments to creating a global skincare brand represents a new wave of conscious entrepreneurship prioritizing community and sustainability.",
    date: "February 2023",
    image: "https://images.unsplash.com/photo-1623039405147-547794f92e9e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    publication: "Forbes",
    title: "The Most Innovative Beauty Businesses of 2023",
    excerpt: "Dufie's Skincare has created a unique business model that supports regenerative farming while delivering premium skincare products with clinically proven results.",
    date: "January 2023",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const Press = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="Press" 
        subtitle="Latest news, media coverage, and resources for Dufie's Skincare."
      />
      
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <h2 className="text-3xl font-playfair font-bold">Press Releases</h2>
            <Button variant="outline" size="sm">
              Subscribe to Press Updates
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-6 mb-12">
            {pressReleases.map(release => (
              <Card key={release.id} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0 md:pr-8">
                    <div className="flex items-center mb-2">
                      <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                        {release.category}
                      </span>
                      <span className="text-xs text-muted-foreground ml-3">
                        {release.date}
                      </span>
                    </div>
                    <h3 className="font-playfair font-semibold text-xl mb-2">{release.title}</h3>
                    <p className="text-muted-foreground">{release.excerpt}</p>
                  </div>
                  <div className="flex items-center md:items-end flex-shrink-0">
                    <Button variant="outline" size="sm" className="rounded-full">
                      Read Full Release
                      <FileText className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="rounded-full">
              View All Press Releases
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-playfair font-bold mb-10">Media Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {mediaFeatures.map(feature => (
              <Card 
                key={feature.id} 
                className="border-0 shadow-sm overflow-hidden product-card"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.publication} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{feature.publication}</h3>
                    <span className="text-xs text-muted-foreground">
                      {feature.date}
                    </span>
                  </div>
                  <h4 className="font-playfair font-semibold text-lg mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{feature.excerpt}</p>
                  <Button variant="link" size="sm" className="p-0">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="rounded-full">
              View All Media Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="p-8 border-0 shadow-sm">
              <h2 className="text-3xl font-playfair font-bold mb-6">Media Inquiries</h2>
              <p className="text-muted-foreground mb-6">
                For media inquiries, interview requests, or high-resolution images, 
                please contact our public relations team. We're happy to provide 
                additional information about our brand, products, or sustainability initiatives.
              </p>
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-medium">Press Contact:</h4>
                  <p className="text-muted-foreground">Sarah Johnson, PR Director</p>
                </div>
                <div>
                  <h4 className="font-medium">Email:</h4>
                  <p className="text-muted-foreground">press@dufies.com</p>
                </div>
                <div>
                  <h4 className="font-medium">Phone:</h4>
                  <p className="text-muted-foreground">+233 12 345 6000</p>
                </div>
              </div>
              <Button className="rounded-full">Contact PR Team</Button>
            </Card>
            
            <Card className="p-8 border-0 shadow-sm">
              <h2 className="text-3xl font-playfair font-bold mb-6">Press Kit</h2>
              <p className="text-muted-foreground mb-6">
                Download our press kit for brand information, founder bios, product details, 
                high-resolution imagery, and our latest press releases. For additional 
                materials or specific requests, please contact our PR team.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <span>Brand Overview & Mission</span>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <span>Founder Biographies</span>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <span>Product Information</span>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <span>High-Resolution Images</span>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
              <Button className="rounded-full">Download Complete Press Kit</Button>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Press;
