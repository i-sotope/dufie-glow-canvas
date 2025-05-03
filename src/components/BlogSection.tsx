
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Skin's Microbiome",
    excerpt: "Learn how the balance of bacteria on your skin affects your overall complexion and how to nurture it naturally.",
    date: "May 1, 2023",
    image: "https://images.unsplash.com/photo-1624915787949-47c151907c81?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Skin Science"
  },
  {
    id: 2,
    title: "The Benefits of Plant-Based Skincare",
    excerpt: "Discover why botanicals are not just trendy but truly effective for achieving healthy, glowing skin.",
    date: "April 20, 2023",
    image: "https://images.unsplash.com/photo-1564202482141-0f6eb5c41c50?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Ingredients"
  },
  {
    id: 3,
    title: "Creating a Minimalist Skincare Routine",
    excerpt: "Simplify your regimen without sacrificing results with our expert-backed minimalist approach to skincare.",
    date: "April 15, 2023",
    image: "https://images.unsplash.com/photo-1614806687380-3296a3963a3b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Routines"
  }
];

const BlogSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Skincare Journal
            </h2>
            <p className="text-muted-foreground max-w-md">
              Expert advice, skincare tips, and beauty insights from our team of specialists.
            </p>
          </div>
          <Button variant="link" size="sm" className="mt-4 md:mt-0">
            View All Articles
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
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
    </section>
  );
};

export default BlogSection;
