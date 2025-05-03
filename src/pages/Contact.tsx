
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll be in touch soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Contact Us" 
        subtitle="Have questions or feedback? We're here to help."
      />

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex gap-4">
                  <div className="bg-secondary rounded-full p-3 h-fit">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg mb-1">Visit Us</h3>
                    <address className="text-muted-foreground not-italic">
                      123 Botanical Lane<br />
                      Accra, Ghana<br />
                      West Africa
                    </address>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <div className="flex gap-4">
                  <div className="bg-secondary rounded-full p-3 h-fit">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:hello@dufies.com">hello@dufies.com</a>
                    </p>
                    <p className="text-muted-foreground">
                      <a href="mailto:support@dufies.com">support@dufies.com</a>
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <div className="flex gap-4">
                  <div className="bg-secondary rounded-full p-3 h-fit">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+233123456789">+233 12 345 6789</a>
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <div className="flex gap-4">
                  <div className="bg-secondary rounded-full p-3 h-fit">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg mb-1">Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                    <p className="text-muted-foreground">Saturday: 10am - 4pm</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-0 shadow-sm">
                <h2 className="text-2xl font-playfair font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="rounded-full px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-playfair font-bold mb-8 text-center">Visit Our Store</h2>
          <div className="h-[400px] rounded-xl overflow-hidden">
            {/* Placeholder for map */}
            <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
              <p className="text-muted-foreground">Interactive Map Would Be Displayed Here</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
