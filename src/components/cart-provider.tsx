import { TYPE_PRODUCTS } from '@/lib/types'
import { createContext, useContext, useState, ReactNode } from 'react'

type CartContextType = {
  cart: TYPE_PRODUCTS[]
  addItem: (item: TYPE_PRODUCTS) => void
  removeItem: (item: TYPE_PRODUCTS) => void
  emptyCart: () => void
  isItemInCart: (item: TYPE_PRODUCTS) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const localCartKey = '__ECOM_CART'

export function CartProvider({ children }: { children: ReactNode }) {
  
  const localCart = localStorage.getItem(localCartKey) ?? []
  const parsedLocalCart =
    typeof localCart === 'string' ? JSON.parse(localCart) : []
  const [cart, setCart] = useState<TYPE_PRODUCTS[]>(parsedLocalCart)

  function addItem(item: TYPE_PRODUCTS) {
    const updatedCart = [...cart, item]
    setCart(updatedCart)
    localStorage.setItem(localCartKey, JSON.stringify(updatedCart))
  }

  function emptyCart() {
    setCart([])
    localStorage.removeItem(localCartKey)
  }

  function removeItem(item: TYPE_PRODUCTS) {
    const updatedCart = cart.filter((x) => x.id !== item.id)

    setCart(updatedCart)
    if (!updatedCart?.length) {
      localStorage.removeItem(localCartKey)
    } else {
      localStorage.setItem(localCartKey, JSON.stringify(updatedCart))
    }
  }

  function isItemInCart(item: TYPE_PRODUCTS) {
    return cart.some((x) => x.id === item.id)
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
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
