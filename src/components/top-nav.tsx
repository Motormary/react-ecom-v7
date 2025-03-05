import { db } from '@/lib/database'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { RefreshCw, Search, ShoppingCart, Store } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { useCart } from './cart-provider'
import ErrorBox from './error'
import { Input } from './ui/input'

function handleBlur(event: React.KeyboardEvent<HTMLElement>) {
  if (event.key === 'Escape') event.currentTarget.blur()
}

export default function TopNav() {
  const { cartPrice, cartQuantity } = useCart()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [value, setValue] = useState<string>('')
  const { data, isError, error, refetch, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: db.products.getAll,
  })

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
          <Link
            draggable={false}
            to="/"
            className="flex items-center gap-4 p-1">
            <Store className="inline-block" />
            <span className="font-semibold">E-COM.COM</span>
          </Link>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                draggable={false}
                to="/cart"
                className="relative flex items-center gap-2">
                <span
                  className={cn(
                    !cartQuantity() && 'hidden',
                    'text-sm text-muted-foreground'
                  )}>
                  {cartPrice()}
                </span>
                <ShoppingCart
                  aria-label="shopping-cart icon"
                  className="fill-primary/30"
                />
                {!!cartQuantity() ? (
                  <div className="absolute -top-3 -right-3 grid place-content-center bg-destructive text-white rounded-full p-1 max-h-5 min-w-5 z-10 text-sm">
                    {cartQuantity() ?? ''}
                  </div>
                ) : null}
              </Link>
            </li>
          </ul>
        </nav>
        <div ref={containerRef} className="group relative sm:w-[30rem] mx-auto">
          <Input
            disabled={isPending}
            id="search"
            name="search"
            placeholder="Search products"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onKeyDown={handleBlur}
            className="pl-9"
            autoComplete="off"
          />
          <label
            htmlFor="search"
            className="absolute left-3 top-1/2 -translate-y-1/2">
            {isPending ? (
              <RefreshCw className="animate-spin text-muted-foreground size-4" />
            ) : (
              <Search
                aria-label="search-icon"
                className=" text-muted-foreground size-4"
              />
            )}
          </label>
          <ul
            className="group-[:not(:focus-within)]:hidden empty:hidden space-y-2 absolute bg-popover rounded-lg z-40 top-12 left-0 w-full h-fit border p-2 shadow-md max-h-96 overflow-y-auto"
            style={{ scrollbarWidth: 'thin' }}>
            {value?.length > 1 && filteredData?.length ? (
              filteredData.map((item) => {
                const isOnSale =
                  item.price === item.discountedPrice ? false : true

                return (
                  <li
                    key={`${item.id}-Search`}
                    className="relative flex gap-2 items-center overflow-hidden has-focus:bg-muted has-hover:bg-muted p-1 rounded-md">
                    <Link
                      draggable={false}
                      to={`/product/${item.id}`}
                      onClick={(e) => e.currentTarget.blur()}
                      onKeyDown={handleBlur}
                      className="peer absolute inset-0"></Link>
                    <div className="overflow-hidden size-10 min-w-10">
                      <img
                        className="w-full h-full object-cover rounded-md border"
                        src={item.image.url}
                        alt={item.image.alt}
                      />
                    </div>
                    <div className="w-full flex max-sm:flex-col items-baseline gap-1">
                      <p className="text-sm">{item.title}</p>
                      {isOnSale ? (
                        <span className="text-xs text-green-600 text-nowrap">
                          ON SALE
                        </span>
                      ) : null}
                    </div>
                    <p
                      title={item.discountedPrice.toString()}
                      className="truncate overflow-hidden pr-2 w-fit text-right text-xs text-secondary-foreground/80 shrink-0">
                      ${item.discountedPrice}
                    </p>
                  </li>
                )
              })
            ) : value?.length > 1 && !isError ? (
              <small className="select-none">No results</small>
            ) : value?.length > 1 && isError ? (
              <ErrorBox refetch={refetch} error={error} />
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  )
}
