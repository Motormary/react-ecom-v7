import { ShoppingCart, Store } from 'lucide-react'
import { Link } from 'react-router'
import { useCart } from './cart-provider'
import { cn } from '@/lib/utils'

export default function TopNav() {
  const { cart } = useCart()

  return (
    <div className="nav flex justify-center pt-4">
      <div className="container px-5 md:px-10">
        <nav className="max-h-16 flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-4 p-1">
            <Store className="inline-block" />
            <span className="font-semibold">E-COM.COM</span>
          </Link>
          <ul className="flex items-center gap-8">
            <li>
              <Link to="/cart" className="flex items-center gap-2">
                <span className={cn(!cart?.length && 'hidden')}>
                  {/* There is no way to check if the item is on sale, so we use price */}
                  {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)},-
                </span>
                <ShoppingCart />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
