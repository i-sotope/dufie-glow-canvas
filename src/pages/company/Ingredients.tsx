
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, X } from "lucide-react";
import { useState } from "react";

// Sample ingredient data
const ingredients = [
  {
    id: 1,
    name: "Rosehip Seed Oil",
    description: "Rich in vitamins A and C, rosehip seed oil promotes cell turnover and collagen production, reducing the appearance of scars, fine lines, and hyperpigmentation.",
    benefits: ["Anti-aging", "Brightening", "Hydrating"],
    origin: "Chile",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1620726990316-eb45427a7995?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Oils"
  },
  {
    id: 2,
    name: "Bakuchiol",
    description: "A gentle, plant-based alternative to retinol, bakuchiol stimulates collagen production and cell renewal without irritation, making it ideal for sensitive skin.",
    benefits: ["Anti-aging", "Soothing", "Firming"],
    origin: "India",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Botanicals"
  },
  {
    id: 3,
    name: "Hyaluronic Acid",
    description: "A powerful humectant that can hold up to 1000 times its weight in water, hyaluronic acid deeply hydrates skin and helps maintain moisture balance throughout the day.",
    benefits: ["Hydrating", "Plumping", "Smoothing"],
    origin: "Laboratory-synthesized from plant-based sources",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1598453572762-e5d5f6adddd5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Humectants"
  },
  {
    id: 4,
    name: "Shea Butter",
    description: "A nourishing emollient rich in vitamins A, E, and F, shea butter deeply moisturizes and repairs the skin barrier, providing relief for dry or damaged skin.",
    benefits: ["Moisturizing", "Repairing", "Protecting"],
    origin: "West Africa",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Butters"
  },
  {
    id: 5,
    name: "Niacinamide",
    description: "A form of vitamin B3 that supports the skin barrier, regulates oil production, minimizes pores, and evens skin tone for a clearer, more balanced complexion.",
    benefits: ["Balancing", "Brightening", "Pore-reducing"],
    origin: "Laboratory-synthesized from natural sources",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1616086693922-d5b9e4613261?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Vitamins"
  },
  {
    id: 6,
    name: "Calendula Extract",
    description: "Known for its anti-inflammatory and healing properties, calendula extract soothes irritation, reduces redness, and supports skin repair for sensitive or reactive skin types.",
    benefits: ["Soothing", "Healing", "Anti-inflammatory"],
    origin: "Europe and North America",
    sustainablySourced: true,
    image: "https://images.unsplash.com/photo-1594287266024-1d2053aeacf7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Botanicals"
  }
];

// Filter categories
const categories = ["All", "Oils", "Botanicals", "Humectants", "Butters", "Vitamins"];
const benefits = ["All", "Anti-aging", "Brightening", "Hydrating", "Soothing", "Firming", "Plumping", "Smoothing", "Moisturizing", "Repairing", "Protecting", "Balancing", "Pore-reducing", "Healing", "Anti-inflammatory"];

const Ingredients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBenefit, setActiveBenefit] = useState("All");
  
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ingredient.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || ingredient.category === activeCategory;
    const matchesBenefit = activeBenefit === "All" || ingredient.benefits.includes(activeBenefit);
    
    return matchesSearch && matchesCategory && matchesBenefit;
  });

  return (
    <PageLayout>
      <PageHeader 
        title="Our Ingredients" 
        subtitle="Discover the botanical powerhouses behind our effective formulations."
      />
      
      <section className="py-16">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-6">Our Ingredient Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <p className="text-muted-foreground">
                At Dufie's, we believe that nature provides the most powerful skincare ingredients. 
                Our formulations combine traditional botanical wisdom with modern extraction techniques 
                to ensure maximum potency and efficacy.
              </p>
              <p className="text-muted-foreground">
                We're committed to full transparency about what goes into our products. Every ingredient 
                is carefully selected for its specific benefits, tested for purity, and sourced with respect 
                for both communities and ecosystems.
              </p>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-10 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search ingredients..."
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
          
          {/* Ingredients Grid */}
          {filteredIngredients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredIngredients.map(ingredient => (
                <Card 
                  key={ingredient.id} 
                  className="border-0 shadow-sm overflow-hidden"
                >
                  <div className="aspect-video">
                    <img 
                      src={ingredient.image} 
                      alt={ingredient.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-playfair font-semibold text-lg">{ingredient.name}</h3>
                      <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                        {ingredient.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{ingredient.description}</p>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {ingredient.benefits.map(benefit => (
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
                      <span>Origin: {ingredient.origin}</span>
                      {ingredient.sustainablySourced && (
                        <span className="text-green-600 font-medium">Sustainably sourced</span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No ingredients found matching your search criteria.</p>
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
            <h2 className="text-3xl font-playfair font-bold mb-4">What We Don't Use</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Just as important as what we include in our formulations is what we choose to leave out.
              Here are the ingredients you'll never find in Dufie's products:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold mb-3">Harsh Synthetics</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sulfates (SLS/SLES)</li>
                <li>Parabens</li>
                <li>Phthalates</li>
                <li>Formaldehyde</li>
                <li>Synthetic fragrances</li>
              </ul>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold mb-3">Potential Irritants</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Artificial colors</li>
                <li>Mineral oil</li>
                <li>Petroleum derivatives</li>
                <li>Silicones</li>
                <li>Ethanolamines (DEA/MEA/TEA)</li>
              </ul>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold mb-3">Environmentally Harmful</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Microbeads</li>
                <li>Triclosan</li>
                <li>Oxybenzone</li>
                <li>BHA/BHT</li>
                <li>PFAS compounds</li>
              </ul>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold mb-3">Animal-Derived</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Lanolin</li>
                <li>Squalene (shark-derived)</li>
                <li>Carmine</li>
                <li>Gelatin</li>
                <li>Animal-tested ingredients</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">Have Questions About Our Ingredients?</h2>
          <p className="text-muted-foreground mb-8">
            We're committed to full transparency about what goes into our products. 
            If you have questions about specific ingredients or want to learn more about 
            our formulation process, our team is here to help.
          </p>
          <Button className="rounded-full px-8">Contact Our Formulators</Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Ingredients;
