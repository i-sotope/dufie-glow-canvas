
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="font-playfair text-xl font-semibold mb-4">DUFIE'S</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Elevating your natural beauty with pure, plant-based skincare formulations since 2015.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full bg-muted/50 hover:bg-muted">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-muted/50 hover:bg-muted">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-muted/50 hover:bg-muted">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop/all-products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link to="/shop/bestsellers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bestsellers</Link></li>
              <li><Link to="/shop/new-arrivals" className="text-sm text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop/gift-sets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Gift Sets</Link></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/company/our-story" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Our Story</Link></li>
              <li><Link to="/company/sustainability" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sustainability</Link></li>
              <li><Link to="/company/ingredients" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Ingredients</Link></li>
              <li><Link to="/company/press" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Press</Link></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQs</Link></li>
              <li><Link to="/shipping-returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dufie's Skincare. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
