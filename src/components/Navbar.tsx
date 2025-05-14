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
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="font-playfair text-2xl font-semibold tracking-tight">
          DUFIE'S
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">
            Shop
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/journal" className="text-sm font-medium hover:text-primary transition-colors">
            Journal
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
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

          {/* Hamburger Menu */}
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

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[500px] py-4 border-t" : "max-h-0"
        }`}
      >
        <div className="container flex flex-col items-end space-y-4 text-right">
          <Link to="/" onClick={closeMenu} className="text-base font-medium text-foreground">
            Home
          </Link>
          <Link to="/shop" onClick={closeMenu} className="text-base font-medium text-foreground">
            Shop
          </Link>
          <Link to="/about" onClick={closeMenu} className="text-base font-medium text-foreground">
            About
          </Link>
          <Link to="/journal" onClick={closeMenu} className="text-base font-medium text-foreground">
            Journal
          </Link>
          <Link to="/contact" onClick={closeMenu} className="text-base font-medium text-foreground">
            Contact
          </Link>
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
