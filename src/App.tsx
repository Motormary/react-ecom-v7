import { useCart } from "./components/cart-provider"

function App() {
  const { addItem, isItemInCart, removeItem } = useCart()
  return (
    <>
      <h1>Home</h1>
      <div className="p-10">
        item 123
        <button
        className="border p-2 bg-accent-foreground rounded-xl text-primary-foreground"
          onClick={() => {
            if (isItemInCart("item-123")) {
              removeItem("item-123")
            } else {
              addItem("item-123")
            }
          }}>
          {isItemInCart("item-123") ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
    </>
  )
}

export default App
