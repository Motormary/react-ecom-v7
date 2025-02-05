import { db } from '@/lib/database'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { RefreshCw, Search, ShoppingCart, Store } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { useCart } from './cart-provider'
import { Input } from './ui/input'

function handleBlur(event: React.KeyboardEvent<HTMLElement>) {
  if (event.key === 'Escape') event.currentTarget.blur()
}

export default function TopNav() {
  const { cart } = useCart()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [value, setValue] = useState<string>('')
  const { isPending, data } = useQuery({
    queryKey: ['products'],
    queryFn: db.products.getAll,
  })

  if (isPending)
    return (
      <div className="py-20 grid place-items-center">
        <RefreshCw className="animate-spin size-10" />
      </div>
    )

  const filteredData = data?.data?.length
    ? data.data.filter(
        (item) =>
          item.title.toLowerCase().includes(value?.toLowerCase()) ||
          item.description.toLowerCase().includes(value?.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(value?.toLowerCase())
          )
      )
    : null

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
        <div ref={containerRef} className="group relative sm:w-[30rem] mx-auto">
          <Input
            id="search"
            name="search"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onKeyDown={handleBlur}
            className="pl-9"
            autoComplete='off'
          />
          <label
            htmlFor="search"
            className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search
              aria-label="search-icon"
              className=" text-muted-foreground size-4"
            />
          </label>
          <ul className="group-[:not(:focus-within)]:hidden empty:hidden space-y-2 absolute bg-popover rounded-lg z-40 top-12 left-0 w-full h-fit border p-2 shadow-md">
            {value?.length > 1 && filteredData?.length ? (
              filteredData.map((item) => (
                <li
                  key={`${item.id}-Search`}
                  className="relative grid grid-cols-[10%_50%_40%] gap-1 place-items-center overflow-hidden has-focus:bg-muted has-hover:bg-muted p-1 rounded-md">
                  <Link
                    to={`/product/${item.id}`}
                    onClick={(e) => e.currentTarget.blur()}
                    onKeyDown={handleBlur}
                    className="peer absolute inset-0"></Link>
                  <div className="overflow-hidden size-10">
                    <img
                      className="w-full h-full object-cover rounded-md border"
                      src={item.image.url}
                      alt={item.image.alt}
                    />
                  </div>
                  <p className="w-full text-sm">{item.title}</p>
                  <p
                    title={item.price.toString()}
                    className="truncate overflow-hidden pr-2 w-full text-right text-xs text-secondary-foreground/80">
                    ${item.price}
                  </p>
                </li>
              ))
            ) : value?.length > 1 ? (
              <small className="select-none">No results</small>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  )
}
