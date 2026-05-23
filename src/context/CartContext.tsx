import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import type { CartItemWithProduct, Product } from '../lib/supabase';

interface CartContextType {
  items: CartItemWithProduct[];
  loading: boolean;
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, quantity?: number, giftPackaging?: boolean, customizationText?: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, products(*)')
        .eq('user_id', user.id);

      if (error) throw error;
      setItems((data as CartItemWithProduct[]) || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce((total, item) => {
    const price = item.products?.price || 0;
    return total + price * item.quantity;
  }, 0);

  const addToCart = async (
    product: Product,
    quantity = 1,
    giftPackaging = false,
    customizationText = ''
  ) => {
    if (!user) {
      throw new Error('Please login to add items to cart');
    }

    const existingItem = items.find((item) => item.product_id === product.id);

    if (existingItem) {
      await updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      const { error } = await supabase.from('cart_items').insert({
        user_id: user.id,
        product_id: product.id,
        quantity,
        gift_packaging: giftPackaging,
        customization_text: customizationText,
      });

      if (error) throw error;
      await fetchCart();
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) throw error;
    await fetchCart();
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) throw error;
    await fetchCart();
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await supabase.from('cart_items').delete().eq('user_id', user.id);

    if (error) throw error;
    setItems([]);
  };

  const refreshCart = fetchCart;

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        itemCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
