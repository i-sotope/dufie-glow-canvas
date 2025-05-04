
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const CartIcon = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  return (
    <Link to="/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full"
            variant="destructive"
          >
            {itemCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default CartIcon;
