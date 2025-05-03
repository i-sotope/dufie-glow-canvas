
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Truck, RefreshCw, Clock } from "lucide-react";

const ShippingReturns = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="Shipping & Returns" 
        subtitle="Everything you need to know about our shipping policies and return process."
      />
      
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-playfair font-bold mb-10">Shipping Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 border-0 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-secondary rounded-full p-3 h-fit">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-playfair font-semibold text-lg mb-3">Delivery Options</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Standard Shipping (3-5 business days)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Express Shipping (1-2 business days)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>International Shipping (7-14 business days)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-secondary rounded-full p-3 h-fit">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-playfair font-semibold text-lg mb-3">Processing Time</h3>
                  <p className="text-muted-foreground mb-4">
                    Orders are typically processed within 1-2 business days. 
                    During peak seasons or promotions, processing may take up to 3 business days.
                  </p>
                  <p className="text-muted-foreground">
                    Orders placed after 2:00 PM EST will be processed the following business day.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-secondary rounded-full p-3 h-fit">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-playfair font-semibold text-lg mb-3">Free Shipping</h3>
                  <p className="text-muted-foreground mb-4">
                    Free standard shipping is available on all domestic orders over $50.
                  </p>
                  <p className="text-muted-foreground">
                    International customers receive free shipping on orders over $100.
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Shipping Rates Table */}
          <h3 className="text-xl font-playfair font-semibold mb-4">Shipping Rates</h3>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="p-4">Shipping Method</th>
                  <th className="p-4">Delivery Timeframe</th>
                  <th className="p-4">Domestic Rate</th>
                  <th className="p-4">International Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Standard Shipping</td>
                  <td className="p-4">3-5 business days</td>
                  <td className="p-4">$5.95 (Free over $50)</td>
                  <td className="p-4">$15.00 (Free over $100)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Express Shipping</td>
                  <td className="p-4">1-2 business days</td>
                  <td className="p-4">$12.95</td>
                  <td className="p-4">$25.00</td>
                </tr>
                <tr>
                  <td className="p-4">Next Day</td>
                  <td className="p-4">Next business day</td>
                  <td className="p-4">$19.95</td>
                  <td className="p-4">Not available</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-6 mb-12">
            <h3 className="text-xl font-playfair font-semibold mb-4">Important Shipping Notes</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span>We ship Monday through Friday, excluding holidays.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span>Delivery times may be longer during peak seasons, promotions, or adverse weather conditions.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span>International customers may be subject to customs duties and import taxes, which are the responsibility of the recipient.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span>We currently ship to most countries worldwide. If your country is not available at checkout, please contact customer service.</span>
              </li>
            </ul>
          </div>
          
          <h2 className="text-3xl font-playfair font-bold mb-10">Returns & Refunds</h2>
          
          <div className="mb-12">
            <Card className="p-6 border-0 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-secondary rounded-full p-3 h-fit">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-playfair font-semibold text-lg mb-3">Our Return Policy</h3>
                  <p className="text-muted-foreground mb-4">
                    We want you to love your Dufie's products. If you're not completely satisfied, 
                    we offer a 30-day satisfaction guarantee on all purchases.
                  </p>
                  
                  <h4 className="font-medium mt-6 mb-2">Eligible Returns:</h4>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Unopened products: Full refund to original payment method</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Lightly used products (less than 30% consumed): Store credit or exchange</span>
                    </li>
                  </ul>
                  
                  <h4 className="font-medium mb-2">Non-Eligible Returns:</h4>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Products used more than 30%</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Gift sets with missing items</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary shrink-0" />
                      <span>Products marked as final sale</span>
                    </li>
                  </ul>
                  
                  <h4 className="font-medium mb-2">Return Process:</h4>
                  <ol className="space-y-4 text-muted-foreground">
                    <li className="flex">
                      <span className="bg-secondary rounded-full h-6 w-6 flex items-center justify-center mr-3 shrink-0">1</span>
                      <span>Contact our customer service team at returns@dufies.com with your order number and reason for return.</span>
                    </li>
                    <li className="flex">
                      <span className="bg-secondary rounded-full h-6 w-6 flex items-center justify-center mr-3 shrink-0">2</span>
                      <span>Our team will provide you with a return shipping label and instructions.</span>
                    </li>
                    <li className="flex">
                      <span className="bg-secondary rounded-full h-6 w-6 flex items-center justify-center mr-3 shrink-0">3</span>
                      <span>Package your return items securely and attach the provided shipping label.</span>
                    </li>
                    <li className="flex">
                      <span className="bg-secondary rounded-full h-6 w-6 flex items-center justify-center mr-3 shrink-0">4</span>
                      <span>Drop off the package at the designated shipping carrier.</span>
                    </li>
                    <li className="flex">
                      <span className="bg-secondary rounded-full h-6 w-6 flex items-center justify-center mr-3 shrink-0">5</span>
                      <span>Once we receive and process your return, your refund or store credit will be issued within 5-7 business days.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">Need Assistance?</h2>
          <p className="text-muted-foreground mb-8">
            If you have any questions about shipping, tracking, or returns, our customer service 
            team is here to help. Contact us and we'll respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="rounded-full px-8">
              Contact Support
            </Button>
            <Button variant="outline" className="rounded-full px-8">
              Track Your Order
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ShippingReturns;
