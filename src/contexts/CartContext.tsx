import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

export interface CartItem {
  id: string;
  product_id: string | null;
  gift_set_id: string | null;
  name: string;
  price: number;
  quantity: number;
  image_url: string | null;
  type: 'product' | 'gift_set';
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (itemToAdd: { product_id?: string | null; gift_set_id?: string | null; quantity: number; name?: string; price?: number; image?: string }) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Fetch cart items on user authentication change
  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          quantity,
          product_id,
          gift_set_id,
          products (
            name,
            price,
            image_url
          ),
          gift_sets (
            name,
            set_price,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      if (data) {
        const formattedItems = data.map(item => {
          if (item.products) {
            return {
              id: item.id,
              product_id: item.product_id,
              gift_set_id: null,
              name: item.products.name,
              price: item.products.price,
              quantity: item.quantity,
              image_url: item.products.image_url,
              type: 'product' as const
            };
          } else if (item.gift_sets) {
            return {
              id: item.id,
              product_id: null,
              gift_set_id: item.gift_set_id,
              name: item.gift_sets.name,
              price: item.gift_sets.set_price ?? 0,
              quantity: item.quantity,
              image_url: item.gift_sets.image_url,
              type: 'gift_set' as const
            };
          } else {
            console.warn("Cart item without product or gift set found:", item.id);
            return null;
          }
        }).filter((item): item is CartItem => item !== null);
        
        setCartItems(formattedItems);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load your cart");
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (itemToAdd: { product_id?: string | null; gift_set_id?: string | null; quantity: number; name?: string; price?: number; image?: string }) => {
    if (!user) {
      toast.error("Please sign in to add items to your cart");
      return;
    }

    setIsLoading(true);
    try {
      const isGiftSet = itemToAdd.gift_set_id != null;
      const idToCheck = isGiftSet ? itemToAdd.gift_set_id : itemToAdd.product_id;
      const columnToCheck = isGiftSet ? 'gift_set_id' : 'product_id';

      if (!idToCheck) {
        toast.error("Item ID missing, cannot add to cart.");
        setIsLoading(false);
        return;
      }

      const { data: existingItem, error: fetchError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq(columnToCheck, idToCheck)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingItem) {
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ 
            quantity: existingItem.quantity + itemToAdd.quantity,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id);

        if (updateError) throw updateError;
      } else {
        const insertPayload: any = {
          user_id: user.id,
          quantity: itemToAdd.quantity
        };
        if (isGiftSet) {
          insertPayload.gift_set_id = idToCheck;
          insertPayload.product_id = null;
        } else {
          insertPayload.product_id = idToCheck;
          insertPayload.gift_set_id = null;
        }
        
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert(insertPayload);

        if (insertError) throw insertError;
      }
      
      const itemName = itemToAdd.name ?? 'Item';
      toast.success(`${itemName} added to cart`);
      await fetchCartItems();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('id', cartItemId);

      if (error) throw error;
      
      setCartItems(currentItems => currentItems.filter(item => item.id !== cartItemId));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (!user || quantity < 1) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ 
          quantity: quantity,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('id', cartItemId);

      if (error) throw error;
      
      setCartItems(currentItems => 
        currentItems.map(item => 
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
