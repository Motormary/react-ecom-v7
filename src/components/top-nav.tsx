import { ShoppingCart, Store } from "lucide-react"
import { Link } from "react-router"
import { useCart } from "./cart-provider"

export default function TopNav() {
  const { cart } = useCart()

  return (
    <div className="nav flex justify-center pt-4">
      <nav className="max-h-16 border flex justify-between items-center container px-10 max-md:mx-2 mx-auto rounded-full py-4">
        <Link to="/" className="flex items-center gap-4 p-1">
          <span className="font-semibold">E-COM</span>
          <Store className="inline-block" />
        </Link>
        <ul className="flex items-center gap-8">
          <li>
            <Link to="/cart" className="flex items-center gap-2">
              <span></span>
              <ShoppingCart />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
