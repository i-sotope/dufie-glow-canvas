
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="font-playfair text-2xl font-semibold tracking-tight">
            DUFIE'S
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Home
          </a>
          <a href="/shop" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Shop
          </a>
          <a href="/about" className="text-sm font-medium hover:text-primary/80 transition-colors">
            About
          </a>
          <a href="/blog" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Journal
          </a>
          <a href="/contact" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
              0
            </span>
          </Button>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background pt-16">
          <nav className="container flex flex-col space-y-6 py-8">
            <a 
              href="/" 
              className="text-lg font-medium border-b border-border pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/shop" 
              className="text-lg font-medium border-b border-border pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </a>
            <a 
              href="/about" 
              className="text-lg font-medium border-b border-border pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="/blog" 
              className="text-lg font-medium border-b border-border pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Journal
            </a>
            <a 
              href="/contact" 
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
