
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "The Art of Meaningful Gift-Giving",
    excerpt: "Explore how thoughtful presents can strengthen relationships and create lasting memories between giver and receiver.",
    date: "May 1, 2023",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1170&auto=format&fit=crop",
    category: "Gift Ideas",
    featured: true
  },
  {
    id: 2,
    title: "Celebration Gifts for Every Milestone",
    excerpt: "Discover perfect gift ideas to commemorate life's important moments, from graduations to anniversaries.",
    date: "April 20, 2023",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1170&auto=format&fit=crop",
    category: "Occasions",
    featured: true
  },
  {
    id: 3,
    title: "Creating the Perfect Gift Basket",
    excerpt: "Learn how to curate themed gift baskets that tell a story and create a complete experience for your recipient.",
    date: "April 15, 2023",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=987&auto=format&fit=crop",
    category: "DIY",
    featured: true
  },
  {
    id: 4,
    title: "Seasonal Gifting: Holiday Edition",
    excerpt: "Our guide to navigating holiday gifting with thoughtfulness and intention, avoiding last-minute stress.",
    date: "March 28, 2023",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=987&auto=format&fit=crop",
    category: "Holidays"
  },
  {
    id: 5,
    title: "The Psychology Behind Gift-Giving",
    excerpt: "Understanding the emotional impact of presents and how they communicate care in relationships.",
    date: "March 15, 2023",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1170&auto=format&fit=crop",
    category: "Insights"
  },
  {
    id: 6,
    title: "Corporate Gifting: Building Business Relationships",
    excerpt: "How thoughtful corporate gifts can strengthen professional connections and express appreciation.",
    date: "March 5, 2023",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1170&auto=format&fit=crop",
    category: "Business"
  }
];

const categories = ["All", "Gift Ideas", "Occasions", "DIY", "Holidays", "Insights", "Business"];

const Journal = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <PageLayout>
      <PageHeader 
        title="Gift Journal" 
        subtitle="Insights, ideas, and inspiration for thoughtful gift-giving and celebration."
      />
      
      <div className="container py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <Button 
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Featured Posts (Top Row) */}
        {activeCategory === "All" && (
          <div className="mb-16">
            <h2 className="text-2xl font-playfair font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.filter(post => post.featured).map(post => (
                <Card
                  key={post.id}
                  className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow product-card"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-playfair font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button variant="link" size="sm" className="p-0">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* All Posts or Filtered Posts */}
        <div>
          <h2 className="text-2xl font-playfair font-bold mb-8">
            {activeCategory === "All" ? "Latest Articles" : `${activeCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <Card
                key={post.id}
                className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow product-card"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-playfair font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button variant="link" size="sm" className="p-0">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Journal;
