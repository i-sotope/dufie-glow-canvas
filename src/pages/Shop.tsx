
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Package, Box, ShoppingBag } from "lucide-react";

const categoryLinks = [
  {
    title: "All Gifts",
    description: "Our complete collection of thoughtfully curated gift options",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=987&auto=format&fit=crop",
    link: "/shop/all-products",
    icon: <Gift className="h-5 w-5" />
  },
  {
    title: "Most Popular",
    description: "Customer favorites and our most beloved gift selections",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1170&auto=format&fit=crop",
    link: "/shop/bestsellers",
    icon: <Gift className="h-5 w-5" />
  },
  {
    title: "New Collections",
    description: "Our latest curated gift sets and seasonal offerings",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1170&auto=format&fit=crop",
    link: "/shop/new-arrivals",
    icon: <Package className="h-5 w-5" />
  },
  {
    title: "Gift Sets",
    description: "Curated collections for every occasion and relationship",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=987&auto=format&fit=crop",
    link: "/shop/gift-sets",
    icon: <Box className="h-5 w-5" />
  }
];

const Shop = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="Our Collections" 
        subtitle="Discover thoughtfully curated gifts designed to celebrate special moments and strengthen relationships."
      />
      
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {categoryLinks.map((category) => (
            <Link to={category.link} key={category.title}>
              <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-all duration-300 product-card">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="h-full">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      {category.icon}
                      <h2 className="font-playfair text-2xl font-semibold">{category.title}</h2>
                    </div>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <Button variant="link" className="w-fit p-0">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Shop;
