
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      <PageHeader 
        title="Privacy Policy" 
        subtitle="Last updated: April 1, 2023"
      />
      
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground">
              At Dufie's Skincare ("we", "us", "our"), we are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or make a purchase. Please read this privacy policy carefully. 
              If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            
            <h2 className="text-2xl font-playfair font-bold mt-10 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-playfair font-semibold mt-6 mb-3">Personal Information</h3>
            <p className="text-muted-foreground">
              We collect personal information that you voluntarily provide to us when you register on 
              our site, express interest in obtaining information about us or our products, or otherwise 
              contact us. This may include:
            </p>
            <ul className="list-disc ml-6 text-muted-foreground">
              <li>Name</li>
              <li>Email address</li>
              <li>Billing and shipping address</li>
              <li>Phone number</li>
              <li>Payment information</li>
              <li>Order history</li>
            </ul>
            
            <h3 className="text-xl font-playfair font-semibold mt-6 mb-3">Automatically Collected Information</h3>
            <p className="text-muted-foreground">
              When you access our website, we may automatically collect certain information about your 
              device, including:
            </p>
            <ul className="list-disc ml-6 text-muted-foreground">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Referring URLs</li>
              <li>Device information</li>
              <li>Pages viewed and time spent on our website</li>
            </ul>
            
            <h2 className="text-2xl font-playfair font-bold mt-10 mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground">We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc ml-6 text-muted-foreground">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and updates</li>
              <li>Respond to your questions and requests</li>
              <li>Improve our website and services</li>
              <li>Develop new products and services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-playfair font-bold mt-10 mb-4">Sharing Your Information</h2>
            <p className="text-muted-foreground">
              We may share your information with third parties in certain circumstances:
            </p>
            <ul className="list-disc ml-6 text-muted-foreground">
              <li><strong>Service providers:</strong> We may share your information with third-party vendors who provide services on our behalf, such as payment processing, shipping, and marketing assistance.</li>
              <li><strong>Business transfers:</strong> If we're involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
              <li><strong>Legal requirements:</strong> We may disclose your information when required by law, such as in response to a subpoena, court order, or other legal process.</li>
            </ul>
            <p className="text-muted-foreground">
              We do not sell your personal information to third parties.
            </p>
            
            <h2 className="text-2xl font-playfair font-bold mt-10 mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to collect information about your browsing 
              activities over time and across different websites. This helps us provide you with a better 
              experience, analyze site traffic, and understand the effectiveness of our marketing efforts.
            </p>
            <p className="text-muted-foreground">
              You can set your browser to refuse all or some browser cookies, or to alert you when websites 
              set or access cookies. If you disable or refuse cookies, please note that some parts of this 
              site may become inaccessible or not function properly.
            </p>
            
            <h2 className="text-2xl font-playfair font-bold mt-10 mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal 
              information. However, no method of transmission over the Internet or electronic storage 
              is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-playfair font-bold mt-10 mb-4">Your Privacy Rights</h2>
            <p className="text-muted-foreground">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc ml-6 text-muted-foreground">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Objection to or restriction of certain processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent (where applicable)</li>
            </ul>
            <p className="text-muted-foreground">
              To exercise these rights, please contact us at privacy@dufies.com.
            </p>
            
            <h2 className="text-2xl font-playfair font-bold mt-10 mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our website is not intended for children under 16 years of age. We do not knowingly collect 
              personal information from children under 16. If we learn we have collected personal information 
              from a child under 16, we will delete this information.
            </p>
            
            <h2 className="text-2xl font-playfair font-bold mt-10 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. The updated version will be indicated 
              by an updated "Last Updated" date and will be effective as soon as it is accessible. 
              We encourage you to review this Privacy Policy regularly to stay informed of how we are 
              protecting your information.
            </p>
            
            <h2 className="text-2xl font-playfair font-bold mt-10 mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions or concerns about this Privacy Policy, please contact our Data 
              Protection Officer at:
            </p>
            <p className="text-muted-foreground">
              Email: privacy@dufies.com<br />
              Address: 123 Botanical Lane, Accra, Ghana<br />
              Phone: +233 12 345 6789
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold text-lg mb-4">Terms of Service</h3>
              <p className="text-muted-foreground mb-6">
                Before using our website or making a purchase, please review our Terms of Service 
                to understand the rules and regulations that govern the use of our site.
              </p>
              <Button variant="outline" className="rounded-full">
                View Terms of Service
              </Button>
            </Card>
            
            <Card className="p-6 border-0 shadow-sm">
              <h3 className="font-playfair font-semibold text-lg mb-4">Cookie Policy</h3>
              <p className="text-muted-foreground mb-6">
                Learn more about how we use cookies and similar technologies to enhance your 
                experience on our website and provide personalized services.
              </p>
              <Button variant="outline" className="rounded-full">
                View Cookie Policy
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;
