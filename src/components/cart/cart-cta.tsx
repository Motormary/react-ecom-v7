import { ChevronRight } from "lucide-react"
import { Link, useLocation } from "react-router"
import { useCart } from "../cart-provider"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/lib/hooks/use-media-query"

const disabledPaths = ["/cart", "/checkout", "/checkout-success"]

export default function ShoppingCartCTA() {
  const { pathname } = useLocation()
  const { cart } = useCart()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (disabledPaths.some((path) => path === pathname.toLowerCase()) || !isDesktop) return null

  return (
    <div
      className={cn(
        cart?.length ? "bottom-20" : "-bottom-10 hidden",
        "fixed block transition-all right-10 z-50"
      )}>
      <Link
        to={"/checkout"}
        className={cn(
          "flex relative group items-center gap-1 bg-primary hover:bg-primary/90 rounded-lg px-3 py-2 text-white hover:cursor-pointer size-fit"
        )}>
        Checkout
        <ChevronRight className="animate-wiggle group-hover:animate-none" />
      </Link>
    </div>
  )
}
