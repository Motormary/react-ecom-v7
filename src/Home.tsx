import { useCart } from "./components/cart-provider"
import { Button } from "./components/ui/button"
import Products from "./components/home/products"

function Home() {
  const { addItem, isItemInCart, removeItem } = useCart()

  return (
    <>
      <h1>Home</h1>
      <div className="p-10">
        item 123
        <Button
          onClick={() => {
            if (isItemInCart("item-123")) {
              removeItem("item-123")
            } else {
              addItem("item-123")
            }
          }}>
          {isItemInCart("item-123") ? "Remove from cart" : "Add to cart"}
        </Button>
        <Products />
      </div>
    </>
  )
}

export default Home
