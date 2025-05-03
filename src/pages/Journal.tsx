
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
    title: "Understanding Your Skin's Microbiome",
    excerpt: "Learn how the balance of bacteria on your skin affects your overall complexion and how to nurture it naturally.",
    date: "May 1, 2023",
    image: "https://images.unsplash.com/photo-1624915787949-47c151907c81?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Skin Science",
    featured: true
  },
  {
    id: 2,
    title: "The Benefits of Plant-Based Skincare",
    excerpt: "Discover why botanicals are not just trendy but truly effective for achieving healthy, glowing skin.",
    date: "April 20, 2023",
    image: "https://images.unsplash.com/photo-1564202482141-0f6eb5c41c50?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Ingredients",
    featured: true
  },
  {
    id: 3,
    title: "Creating a Minimalist Skincare Routine",
    excerpt: "Simplify your regimen without sacrificing results with our expert-backed minimalist approach to skincare.",
    date: "April 15, 2023",
    image: "https://images.unsplash.com/photo-1614806687380-3296a3963a3b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Routines",
    featured: true
  },
  {
    id: 4,
    title: "Seasonal Skincare: Adapting Your Routine",
    excerpt: "How to adjust your skincare regimen as the seasons change to keep your skin balanced and glowing year-round.",
    date: "March 28, 2023",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Routines"
  },
  {
    id: 5,
    title: "The Power of Botanical Extracts",
    excerpt: "A deep dive into how plant extracts can address specific skin concerns from hyperpigmentation to sensitivity.",
    date: "March 15, 2023",
    image: "https://images.unsplash.com/photo-1597400474413-35fb75a53290?q=80&w=1067&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Ingredients"
  },
  {
    id: 6,
    title: "Mindful Beauty: The Connection Between Stress and Skin",
    excerpt: "Exploring how your mental state affects your skin and practices to promote both inner and outer radiance.",
    date: "March 5, 2023",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Wellness"
  }
];

const categories = ["All", "Skin Science", "Ingredients", "Routines", "Wellness"];

const Journal = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <PageLayout>
      <PageHeader 
        title="Skincare Journal" 
        subtitle="Expert advice, skincare tips, and beauty insights from our team of specialists."
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
