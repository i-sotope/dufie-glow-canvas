
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Search, X } from "lucide-react";

// Sample FAQ data
const faqData = [
  {
    category: "Product Information",
    questions: [
      {
        id: "pi-1",
        question: "Are Dufie's products suitable for sensitive skin?",
        answer: "Yes, our products are formulated with sensitive skin in mind. We avoid common irritants like artificial fragrances, harsh sulfates, and alcohols. However, as everyone's skin is unique, we always recommend doing a patch test with new products."
      },
      {
        id: "pi-2",
        question: "Do you test on animals?",
        answer: "Absolutely not. Dufie's is proudly cruelty-free. We never test on animals, nor do we use ingredients that have been animal-tested. Additionally, many of our products are certified vegan."
      },
      {
        id: "pi-3",
        question: "How long will my product last once opened?",
        answer: "Most of our products have a Period After Opening (PAO) of 12 months, indicated by the symbol on the packaging. Because we use minimal preservatives, it's important to use clean hands when applying products and to keep containers tightly closed when not in use."
      },
      {
        id: "pi-4",
        question: "Can I use your products during pregnancy?",
        answer: "While our products are formulated with safe, natural ingredients, we always recommend consulting with your healthcare provider about your skincare routine during pregnancy, as individual circumstances may vary."
      }
    ]
  },
  {
    category: "Orders & Shipping",
    questions: [
      {
        id: "os-1",
        question: "How long does shipping take?",
        answer: "Domestic orders typically arrive within 3-5 business days. International shipping times vary by location but generally range from 7-14 business days. You'll receive tracking information once your order ships."
      },
      {
        id: "os-2",
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times are calculated at checkout based on your location. Please note that customers are responsible for any customs duties or import taxes."
      },
      {
        id: "os-3",
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also view your order status by logging into your account on our website."
      },
      {
        id: "os-4",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All payments are securely processed and encrypted."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        id: "rr-1",
        question: "What is your return policy?",
        answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you may return unopened products for a full refund, or lightly used products for store credit."
      },
      {
        id: "rr-2",
        question: "How do I initiate a return?",
        answer: "To initiate a return, please contact our customer service team at returns@dufies.com with your order number and reason for return. We'll provide you with a return shipping label and instructions."
      },
      {
        id: "rr-3",
        question: "How long does it take to process a refund?",
        answer: "Once we receive your returned items and approve the return, refunds typically process within 5-7 business days. The time it takes to appear in your account depends on your payment method and financial institution."
      }
    ]
  },
  {
    category: "Sustainability",
    questions: [
      {
        id: "s-1",
        question: "Is your packaging recyclable?",
        answer: "We're committed to using sustainable packaging. Our glass containers are recyclable, and our shipping materials are made from recycled, biodegradable materials. We're working toward our goal of 100% plastic-free packaging by 2025."
      },
      {
        id: "s-2",
        question: "Do you have a recycling program?",
        answer: "Yes! Our Circular Beauty program allows customers to return empty Dufie's containers to be cleaned, sterilized, and refilled. In exchange, customers receive store credit for participating."
      },
      {
        id: "s-3",
        question: "Are your ingredients organic?",
        answer: "Many of our botanical ingredients are certified organic, and we prioritize organic sourcing whenever possible. Currently, about 80% of our plant-based ingredients come from certified organic farms or controlled wild harvesting."
      }
    ]
  }
];

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter FAQs based on search term and active category
  const filteredFAQs = faqData.filter(category => {
    // If a category filter is applied and doesn't match, filter out the category
    if (activeCategory !== "All" && category.category !== activeCategory) return false;
    
    // If there's a search term, check if any question or answer in the category contains it
    if (searchTerm) {
      const matchingQuestions = category.questions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchingQuestions.length > 0;
    }
    
    // If no search term and category filter matches or is "All", include the category
    return true;
  });

  // Get all categories for the filter
  const allCategories = ["All", ...faqData.map(category => category.category)];

  return (
    <PageLayout>
      <PageHeader 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about our products, ordering, shipping, and more."
      />
      
      <section className="py-16">
        <div className="container max-w-4xl">
          {/* Search and Filters */}
          <div className="mb-10 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search FAQs..."
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
                {allCategories.map(category => (
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
          </div>
          
          {/* FAQ Content */}
          {filteredFAQs.length > 0 ? (
            <div className="space-y-10">
              {filteredFAQs.map((category) => (
                <div key={category.category}>
                  <h2 className="text-2xl font-playfair font-bold mb-6">{category.category}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions
                      .filter(q => 
                        !searchTerm || 
                        q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(question => (
                        <AccordionItem 
                          key={question.id} 
                          value={question.id}
                          className="border rounded-lg p-1"
                        >
                          <AccordionTrigger className="px-3 hover:no-underline">
                            <span className="text-left font-medium">{question.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pt-2 pb-3 text-muted-foreground">
                            {question.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))
                    }
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No FAQs found matching your search.</p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-8">
            Can't find the answer you're looking for? Our customer support team is here to help.
            Contact us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="rounded-full px-8">
              Contact Support
            </Button>
            <Button variant="outline" className="rounded-full px-8">
              Live Chat
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQs;
