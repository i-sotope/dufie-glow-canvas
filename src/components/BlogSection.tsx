
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Finding the Perfect Gift for Different Personalities",
    excerpt: "Learn how to match gifts with personality types to create meaningful moments for your loved ones.",
    date: "May 1, 2023",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1171&auto=format&fit=crop",
    category: "Gift Guide"
  },
  {
    id: 2,
    title: "The Art of Thoughtful Gifting",
    excerpt: "Discover why personalized gifts create deeper connections and leave lasting impressions.",
    date: "April 20, 2023",
    image: "https://images.unsplash.com/photo-1607344645866-009cdf0f7393?q=80&w=987&auto=format&fit=crop",
    category: "Gift Ideas"
  },
  {
    id: 3,
    title: "Creating Memorable Unboxing Experiences",
    excerpt: "Simple techniques to elevate your gift presentation and make every unwrapping moment special.",
    date: "April 15, 2023",
    image: "https://images.unsplash.com/photo-1608286938291-3ce339da4fb4?q=80&w=987&auto=format&fit=crop",
    category: "Presentation"
  }
];

const BlogSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Gifting Journal
            </h2>
            <p className="text-muted-foreground max-w-md">
              Expert advice, gift ideas, and inspiration to help you celebrate life's special moments.
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
