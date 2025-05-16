
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import SignInButton from "./auth/SignInButton";
import UserDropdown from "./auth/UserDropdown";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm animate-fade-in">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="font-playfair text-2xl font-semibold tracking-tight transition-all duration-300 hover:scale-105">
          DUFIE'S
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-all duration-300 hover:-translate-y-0.5">Home</Link>
          <Link to="/shop" className="text-sm font-medium hover:text-primary/80 transition-all duration-300 hover:-translate-y-0.5">Shop</Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary/80 transition-all duration-300 hover:-translate-y-0.5">About</Link>
          <Link to="/journal" className="text-sm font-medium hover:text-primary/80 transition-all duration-300 hover:-translate-y-0.5">Journal</Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary/80 transition-all duration-300 hover:-translate-y-0.5">Contact</Link>
        </nav>

        {/* Actions */}
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
            <Button variant="ghost" size="icon" className="rounded-full relative transition-transform duration-300 hover:scale-110">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Hamburger */}
          <Button 
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] py-4 border-t' : 'max-h-0'
        }`}
      >
        <div className="container flex flex-col space-y-4">
          <Link to="/" onClick={closeMenu} className="text-base font-medium text-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary">Home</Link>
          <Link to="/shop" onClick={closeMenu} className="text-base font-medium text-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary">Shop</Link>
          <Link to="/about" onClick={closeMenu} className="text-base font-medium text-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary">About</Link>
          <Link to="/journal" onClick={closeMenu} className="text-base font-medium text-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary">Journal</Link>
          <Link to="/contact" onClick={closeMenu} className="text-base font-medium text-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary">Contact</Link>
          {!user && (
            <div>
              <SignInButton onClick={closeMenu} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
