import { CartProvider, useCart } from "@/components/cart-provider"
import ShoppingCartCTA from "@/components/cart/cart-cta"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeToggleButton from "@/components/theme-toggle-button"
import { ShoppingCart, Store } from "lucide-react"
import { Link, Outlet } from "react-router"

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <header className="relative">
          <TopNav />
        </header>
        <main className="container mx-auto px-10 py-8">
          <Outlet />
        </main>
        <footer className="border-t">
          <div className="mx-auto container flex items-center justify-center py-4">
            footer
          </div>
        </footer>
        <ShoppingCartCTA />
      </CartProvider>
      <ThemeToggleButton />
    </ThemeProvider>
  )
}

function TopNav() {
  const { cart } = useCart()

  return (
    <div className="nav relative">
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 max-h-16 border flex justify-between items-center container px-10 mx-auto h-full rounded-full py-4">
        <Link to="/" className="flex items-center gap-4 p-1">
          <span className="font-semibold">E-COM</span>
          <Store className="inline-block" />
        </Link>
        <ul className="flex items-center gap-8">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product/123">Product</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
          <li>
            <Link to="/cart" className="flex flex-col items-center">
              <ShoppingCart />
              <span className="text-sm">Cart</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
