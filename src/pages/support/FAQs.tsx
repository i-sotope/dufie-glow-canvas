
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
import { Search, X, Gift } from "lucide-react";

// Gift-focused FAQ data
const faqData = [
  {
    category: "Gift Selection",
    questions: [
      {
        id: "gs-1",
        question: "How do I choose the perfect gift for someone?",
        answer: "Consider the recipient's interests, hobbies, and preferences. Our curated collections are organized by occasion, recipient, and price point to help you find something meaningful. Our Gift Finder quiz can also provide personalized recommendations based on your answers."
      },
      {
        id: "gs-2",
        question: "Can I customize my gift?",
        answer: "Yes! Many of our gifts can be personalized with monograms, custom messages, or color choices. Look for the 'Customizable' tag on product pages. You can also create your own gift set by selecting individual items you'd like to include."
      },
      {
        id: "gs-3",
        question: "Do you offer gift recommendations for specific occasions?",
        answer: "Absolutely. We have curated collections for birthdays, anniversaries, weddings, housewarmings, and more. You can browse by occasion on our homepage or use the filters on our shop page."
      },
      {
        id: "gs-4",
        question: "What's your most popular gift?",
        answer: "Our Classic Comfort Gift Set consistently ranks as our bestseller, featuring artisanal treats, a hand-poured candle, and a cozy throw. You can browse all our bestsellers in the dedicated section of our shop."
      }
    ]
  },
  {
    category: "Gift Packaging & Presentation",
    questions: [
      {
        id: "gp-1",
        question: "Is gift wrapping available?",
        answer: "Yes, we offer premium gift wrapping services for all our products. During checkout, you can select from several wrapping paper designs and ribbon options. Gift wrapping is complimentary for orders over $75."
      },
      {
        id: "gp-2",
        question: "Can I include a personalized message with my gift?",
        answer: "Of course! During checkout, you'll have the option to add a custom message that will be elegantly handwritten on one of our signature gift cards and included with your package."
      },
      {
        id: "gp-3",
        question: "How are gifts packaged for shipping?",
        answer: "All gifts are carefully packaged in our signature gift boxes with protective materials to ensure they arrive in perfect condition. Gift sets are arranged attractively within the box, making them ready to present upon arrival."
      },
      {
        id: "gp-4",
        question: "Do you offer sustainable packaging options?",
        answer: "Yes, sustainability is central to our mission. All our packaging materials are recyclable or biodegradable, including our gift boxes, tissue paper, and void fill. We avoid plastic wherever possible."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        id: "sd-1",
        question: "Can I ship directly to the gift recipient?",
        answer: "Absolutely! During checkout, you can enter a different shipping address for the recipient. We'll ensure no pricing information is included in the package, and you can add a gift message as well."
      },
      {
        id: "sd-2",
        question: "How quickly will my gift be delivered?",
        answer: "Standard shipping takes 3-5 business days. We also offer expedited shipping (2 business days) and overnight delivery options. Last-minute gifters, we've got you covered!"
      },
      {
        id: "sd-3",
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. Please note that customers are responsible for any customs duties or import taxes."
      },
      {
        id: "sd-4",
        question: "Can I schedule a delivery for a specific date?",
        answer: "Yes, you can select a future delivery date during checkout. This is perfect for ensuring gifts arrive exactly on birthdays, anniversaries, or other special occasions."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        id: "re-1",
        question: "What if the recipient doesn't like their gift?",
        answer: "We offer easy exchanges or store credit for gifts returned within 30 days of delivery. The recipient can initiate this process themselves without needing the original purchaser's information."
      },
      {
        id: "re-2",
        question: "How do I return or exchange a gift?",
        answer: "To initiate a return, contact our customer service team at returns@dufies.com with your order number or the recipient's details. We'll provide a return shipping label and instructions."
      },
      {
        id: "re-3",
        question: "What items are non-returnable?",
        answer: "Personalized or custom gifts cannot be returned unless there's a manufacturing defect. Perishable items like food products also cannot be returned once delivered."
      },
      {
        id: "re-4",
        question: "Do you offer gift receipts?",
        answer: "Yes, you can request a gift receipt during checkout which will be included with your gift. This allows the recipient to exchange the item if needed without seeing the price."
      }
    ]
  },
  {
    category: "Corporate & Bulk Gifting",
    questions: [
      {
        id: "cg-1",
        question: "Do you offer corporate gifting services?",
        answer: "Yes, our dedicated corporate gifting team can help with employee appreciation, client gifts, and event gifting. We offer volume discounts, custom branding options, and streamlined delivery to multiple addresses."
      },
      {
        id: "cg-2",
        question: "Can I add my company logo to gifts?",
        answer: "Absolutely! Many of our products can be customized with your company logo. We also offer custom gift boxes and packaging featuring your branding."
      },
      {
        id: "cg-3",
        question: "Is there a minimum order quantity for corporate gifts?",
        answer: "Our corporate program starts at orders of 10 or more gifts. Larger orders qualify for increased discounts, with special pricing available for orders of 50+ gifts."
      },
      {
        id: "cg-4",
        question: "How do I place a bulk order?",
        answer: "Please contact our corporate gifting team at corporate@dufies.com with details about your requirements. We'll provide a custom quote and work with you to select the perfect gifts for your occasion."
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
        subtitle="Find answers to common questions about our gifts, ordering, shipping, and more."
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
            Can't find the answer you're looking for? Our gifting specialists are here to help.
            Contact us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="rounded-full px-8">
              Contact Support
            </Button>
            <Button variant="outline" className="rounded-full px-8">
              Live Chat with a Gift Expert
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQs;
