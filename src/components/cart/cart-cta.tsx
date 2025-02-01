import { ChevronRight } from "lucide-react"
import { Link, useLocation } from "react-router"
import { useCart } from "../cart-provider"
import { cn } from "@/lib/utils"

const disabledPaths = ["/cart", "/checkout", "/checkout-success"]

const magicBorder =
  "before:content-[''] before:w-[104%] before:h-[102%] before:rounded-lg before:absolute before:top-[-1%] before:left-[-2%] before:-z-10 before:bg-gradient-to-r before:from-[#5ddcff] before:via-[#3c67e3] before:to-[#4e00c2] before:animate-[spin_2.5s_linear_infinite]"

export default function ShoppingCartCTA() {
  const { pathname } = useLocation()
  const { cart } = useCart()

  if (disabledPaths.some((path) => path === pathname.toLowerCase())) return null

  return (
    <div
      className={cn(
        cart?.length ? "bottom-20" : "-bottom-10 hidden",
        "fixed block transition-all right-10 z-50"
      )}>
      <Link
        to={"/checkout"}
        className={cn(
          magicBorder,
          "flex relative items-center gap-1 bg-primary rounded-lg px-3 py-2 text-white hover:cursor-pointer size-fit"
        )}>
        Checkout
        <ChevronRight />
        {/* <div className="absolute top-0 right-0 animate-spin -z-10 bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 w-full h-full"></div> */}
      </Link>
    </div>
  )
}
