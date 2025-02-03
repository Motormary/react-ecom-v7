import { createContext, useContext, useState, ReactNode } from "react"

type CartContextType = {
  cart: string[]
  addItem: (item: string) => void
  removeItem: (item: string) => void
  emptyCart: () => void
  isItemInCart: (item: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const localCartKey = "__ECOM_CART"
  const localCart = localStorage.getItem(localCartKey) ?? []
  const parsedLocalCart =
    typeof localCart === "string" ? JSON.parse(localCart) : []
  const [cart, setCart] = useState<string[]>(parsedLocalCart)

  function addItem(item: string) {
    const updatedCart = [...cart, item]
    setCart(updatedCart)
    localStorage.setItem(localCartKey, JSON.stringify(updatedCart))
  }

  function emptyCart() {
    setCart([])
    localStorage.removeItem(localCartKey)
  }

  function removeItem(item: string) {
    const updatedCart = cart.filter(
      (x) => x.toLowerCase() !== item.toLowerCase()
    )

    setCart(updatedCart)
    if (!updatedCart?.length) {
      localStorage.removeItem(localCartKey)
    } else {
      localStorage.setItem(localCartKey, JSON.stringify(updatedCart))
    }
  }

  function isItemInCart(item: string) {
    return cart.some((x) => x.toLowerCase() === item.toLowerCase())
  }

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, emptyCart, isItemInCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
