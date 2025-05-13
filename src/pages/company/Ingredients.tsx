
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, X } from "lucide-react";
import { useState } from "react";

// Sample gifts data
const giftsProcess = [
  {
    id: 1,
    name: "Artisan Selection",
    description: "We partner with talented artisans and ethical brands worldwide to source high-quality, unique products that you won't find in typical retail stores.",
    benefits: ["Unique", "Handcrafted", "Ethical"],
    origin: "Global",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1620726990316-eb45427a7995?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Sourcing"
  },
  {
    id: 2,
    name: "Personalized Curation",
    description: "Our expert gift curators create thoughtful combinations based on occasion, recipient personality, and your relationship with them, ensuring a meaningful gifting experience.",
    benefits: ["Personalized", "Meaningful", "Expert Selected"],
    origin: "In-house",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Curation"
  },
  {
    id: 3,
    name: "Elegant Packaging",
    description: "Each gift is wrapped with premium sustainable materials, creating a luxurious unboxing experience that adds anticipation and excitement to the gifting moment.",
    benefits: ["Sustainable", "Premium", "Memorable"],
    origin: "Custom designed",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1170&auto=format&fit=crop",
    category: "Presentation"
  },
  {
    id: 4,
    name: "Personalized Messaging",
    description: "Every gift includes a handwritten note or custom message card, adding a personal touch that expresses your sentiment in a genuine and heartfelt way.",
    benefits: ["Personal", "Heartfelt", "Custom"],
    origin: "Handcrafted",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Personal Touch"
  },
  {
    id: 5,
    name: "Global Delivery",
    description: "Our international shipping network ensures your gifts arrive safely and on time anywhere in the world, with careful handling and detailed tracking throughout the journey.",
    benefits: ["Worldwide", "Reliable", "Timely"],
    origin: "Global logistics network",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1616086693922-d5b9e4613261?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Delivery"
  },
  {
    id: 6,
    name: "Recipient Experience",
    description: "We think beyond the gift itself to create memorable unboxing moments, with layered reveals, sensory elements, and thoughtful presentation that enhances the gifting experience.",
    benefits: ["Experiential", "Memorable", "Delightful"],
    origin: "Design studio",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1160&auto=format&fit=crop",
    category: "Experience"
  }
];

// Filter categories
const categories = ["All", "Sourcing", "Curation", "Presentation", "Personal Touch", "Delivery", "Experience"];
const benefits = ["All", "Unique", "Handcrafted", "Ethical", "Personalized", "Meaningful", "Expert Selected", "Sustainable", "Premium", "Memorable", "Personal", "Heartfelt", "Custom", "Worldwide", "Reliable", "Timely", "Experiential", "Delightful"];

const OurProcess = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBenefit, setActiveBenefit] = useState("All");
  
  const filteredProcess = giftsProcess.filter(process => {
    const matchesSearch = process.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         process.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || process.category === activeCategory;
    const matchesBenefit = activeBenefit === "All" || process.benefits.includes(activeBenefit);
    
    return matchesSearch && matchesCategory && matchesBenefit;
  });

  return (
    <PageLayout>
      <PageHeader 
        title="Our Process" 
        subtitle="Discover how we create meaningful gifting experiences from selection to delivery."
      />
      
      <section className="py-16">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-6">Our Gifting Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <p className="text-muted-foreground">
                At Dufie's, we believe that gifting is an art form. Our careful process combines 
                thoughtful selection, personal touches, and beautiful presentation to transform 
                ordinary gifts into extraordinary experiences that strengthen relationships.
              </p>
              <p className="text-muted-foreground">
                We're committed to transparency about our process and materials. Each element 
                of our gifts is carefully selected, ethically sourced, and assembled with care, 
                ensuring that every gift tells a story and creates a meaningful connection.
              </p>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-10 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search our process..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeCategory === category 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Filter by Benefit</h3>
              <div className="flex flex-wrap gap-2">
                {benefits.map(benefit => (
                  <button
                    key={benefit}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeBenefit === benefit 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    onClick={() => setActiveBenefit(benefit)}
                  >
                    {benefit}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Process Grid */}
          {filteredProcess.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProcess.map(process => (
                <Card 
                  key={process.id} 
                  className="border-0 shadow-sm overflow-hidden"
                >
                  <div className="aspect-video">
                    <img 
                      src={process.image} 
                      alt={process.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-playfair font-semibold text-lg">{process.name}</h3>
                      <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                        {process.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{process.description}</p>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {process.benefits.map(benefit => (
                          <span 
                            key={benefit} 
                            className="text-xs px-2 py-0.5 border border-primary/30 rounded-full text-primary"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Method: {process.origin}</span>
                      {process.sustainablySourced && (
                        <span className="text-green-600 font-medium">Sustainably sourced</span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No process steps found matching your search criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                  setActiveBenefit("All");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">What We Don't Do</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Just as important as our meticulous process is what we choose to avoid.
              Here are the practices you'll never find at Dufie's:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold mb-3">Mass Production</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Generic gift boxes</li>
                <li>Low-quality fillers</li>
                <li>Cookie-cutter solutions</li>
                <li>Impersonal assembly lines</li>
                <li>One-size-fits-all approaches</li>
              </ul>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold mb-3">Wasteful Practices</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Excessive packaging</li>
                <li>Single-use plastics</li>
                <li>Non-recyclable materials</li>
                <li>Unnecessary packaging fillers</li>
                <li>Disposable gift components</li>
              </ul>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold mb-3">Unethical Sourcing</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Exploitative labor practices</li>
                <li>Harmful environmental impacts</li>
                <li>Culturally insensitive items</li>
                <li>Counterfeit or misrepresented products</li>
                <li>Animal-tested components</li>
              </ul>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold mb-3">Empty Gestures</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Superficial messaging</li>
                <li>Generic gift cards</li>
                <li>Meaningless luxury markup</li>
                <li>Quantity over quality</li>
                <li>Trendy but forgettable items</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">Have Questions About Our Process?</h2>
          <p className="text-muted-foreground mb-8">
            We're committed to transparency about how we create our gifts. 
            If you have questions about our sourcing, curation, or presentation process, 
            our gift consultants are here to help.
          </p>
          <Button className="rounded-full px-8">Contact Our Gift Consultants</Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default OurProcess;
