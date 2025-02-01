import { useState } from "react"

export function useCart() {
  const [cart, setCart] = useState<string[]>([])

  function addItem(item: string) {
    setCart((prev) => [...prev, item])
  }

  function emptyCart() {
    setCart([])
  }

  function removeItem(item: string) {
    setCart((prev) =>
      prev.filter((x) => x.toLowerCase() !== item.toLowerCase())
    )
  }

  function isItemInCart(item: string) {
    if (cart.some((x) => x.toLowerCase() === item.toLowerCase())) return true
    return false
  }

  return { cart, addItem, removeItem, emptyCart, isItemInCart }
}
