
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/AuthContext";
import SignInButton from "./auth/SignInButton";
import UserDropdown from "./auth/UserDropdown";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="font-playfair text-2xl font-semibold tracking-tight">
            DUFIE'S
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Shop
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary/80 transition-colors">
            About
          </Link>
          <Link to="/journal" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Journal
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user ? (
            <UserDropdown />
          ) : (
            <div className="hidden md:block">
              <SignInButton variant="ghost" />
            </div>
          )}
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

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
        <div className="md:hidden fixed inset-0 z-50 bg-background pt-16 dark:bg-gray-800/95 bg-white/95">
          <nav className="container flex flex-col space-y-6 py-8">
            <Link 
              to="/" 
              className="text-lg font-medium border-b border-border pb-4"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="text-lg font-medium border-b border-border pb-4"
              onClick={closeMenu}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium border-b border-border pb-4"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/journal" 
              className="text-lg font-medium border-b border-border pb-4"
              onClick={closeMenu}
            >
              Journal
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium border-b border-border pb-4"
              onClick={closeMenu}
            >
              Contact
            </Link>
            
            {!user && (
              <div className="pt-4">
                <SignInButton onClick={closeMenu} />
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
