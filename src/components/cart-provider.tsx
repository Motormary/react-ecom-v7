import { createContext, useContext, useState, ReactNode } from "react";

type CartContextType = {
  cart: string[];
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  emptyCart: () => void;
  isItemInCart: (item: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);

  function addItem(item: string) {
    setCart((prev) => [...prev, item]);
  }

  function emptyCart() {
    setCart([]);
  }

  function removeItem(item: string) {
    setCart((prev) =>
      prev.filter((x) => x.toLowerCase() !== item.toLowerCase())
    );
  }

  function isItemInCart(item: string) {
    return cart.some((x) => x.toLowerCase() === item.toLowerCase());
  }

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, emptyCart, isItemInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
