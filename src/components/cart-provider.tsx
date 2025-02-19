import { TYPE_PRODUCTS } from '@/lib/types'
import { createContext, ReactNode, useContext, useState } from 'react'

/**
 *
 *
 */
type CartContextType = {
  cart: TYPE_PRODUCTS[]
  addItem: (item: TYPE_PRODUCTS) => void
  removeItem: (item: TYPE_PRODUCTS['id']) => void
  emptyCart: () => void
  isItemInCart: (item: TYPE_PRODUCTS['id']) => TYPE_PRODUCTS | undefined
  cartQuantity: () => number
  cartPrice: () => string
  setQuantity: (item_id: string, quantity: number) => void
}
/**
 *
 *
 */
const CartContext = createContext<CartContextType | undefined>(undefined)
const localCartKey = '__ECOM_CART'
/**
 *
 *
 */

// ---------------------- PROVIDER ----------------------------------
export function CartProvider({ children }: { children: ReactNode }) {
  const localCart = localStorage.getItem(localCartKey) ?? []

  const parsedLocalCart =
    typeof localCart === 'string' ? JSON.parse(localCart) : []

  const [cart, setCart] = useState<TYPE_PRODUCTS[]>(parsedLocalCart)

  /**
   *
   * @description Empties cart (state & localStorage)
   */
  function emptyCart() {
    setCart([])
    localStorage.removeItem(localCartKey)
  }

  /**
   *
   * @description Removes an item from cart (state & localStorage) OR reduces its quantity if > 1
   */
  function removeItem(item_id: TYPE_PRODUCTS['id']) {
    const updatedCart = cart.filter((x) => x.id !== item_id)

    setCart(updatedCart)
    if (!updatedCart?.length) {
      localStorage.removeItem(localCartKey)
    } else {
      localStorage.setItem(localCartKey, JSON.stringify(updatedCart))
    }
  }

  /**
   *
   * @description Checks if an item is in cart
   */
  function isItemInCart(item_id: TYPE_PRODUCTS['id']) {
    return cart.find((x) => x.id === item_id)
  }

  /**
   *
   * @description Adds an item to cart
   */
  function addItem(item: TYPE_PRODUCTS) {
    const isItem = isItemInCart(item.id)

    if (isItem) {
      setQuantity(item.id, isItem.quantity + 1)
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1 }]
      setCart(updatedCart)
      localStorage.setItem(localCartKey, JSON.stringify(updatedCart))
    }
  }

  function setQuantity(item_id: TYPE_PRODUCTS['id'], newQuantity: number) {
    const updatedCart = cart.map((x) =>
      x.id === item_id ? { ...x, quantity: newQuantity } : x
    )

    setCart(updatedCart)
    localStorage.setItem(localCartKey, JSON.stringify(updatedCart))
  }

  /**
   *
   * @returns The total quantity of the cart
   */
  function cartQuantity() {
    return cart.reduce((acc, val) => acc + val.quantity, 0)
  }

  /**
   *
   * @returns The total of all the items in the cart
   */
  function cartPrice() {
    return cart
      .reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0)
      .toFixed(2)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        emptyCart,
        isItemInCart,
        cartQuantity,
        cartPrice,
        setQuantity,
      }}>
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
