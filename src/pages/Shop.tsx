
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categoryLinks = [
  {
    title: "All Products",
    description: "Our complete collection of plant-based skincare solutions",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    link: "/shop/all-products"
  },
  {
    title: "Bestsellers",
    description: "Customer favorites and our most popular formulations",
    image: "https://images.unsplash.com/photo-1643185539104-3622eb1f0ff6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    link: "/shop/bestsellers"
  },
  {
    title: "New Arrivals",
    description: "Our latest innovations and seasonal launches",
    image: "https://images.unsplash.com/photo-1600428877878-1a0fd85beda2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    link: "/shop/new-arrivals"
  },
  {
    title: "Gift Sets",
    description: "Curated collections for every skincare routine",
    image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    link: "/shop/gift-sets"
  }
];

const Shop = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="Our Collection" 
        subtitle="Discover plant-powered skincare solutions designed to enhance your natural beauty."
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
                    <h2 className="font-playfair text-2xl font-semibold mb-2">{category.title}</h2>
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
