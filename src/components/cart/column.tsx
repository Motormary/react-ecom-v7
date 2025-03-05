import { TYPE_CART } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router'
import { useCart } from '../cart-provider'
import { useState } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

export const columns: ColumnDef<TYPE_CART>[] = [
  {
    accessorKey: 'image',
    header: () => null,
    cell: ({ row }) => {
      return (
        <div className="relative flex items-center gap-4 group">
          <Link
            draggable={false}
            className="absolute inset-0 focus:outline-none z-10"
            to={`/product/${row.original.id}`}
          />
          <div className="relative size-16 overflow-hidden rounded-lg flex items-center group-focus-within:ring ring-ring ring-offset-2 ring-offset-background">
            <img
              className="object-cover"
              src={row.original.image.url}
              alt={row.original.image.alt}
            />
          </div>
          <div className="min-h-16 max-w-1/3">
            <p className="text-lg whitespace-nowrap">{row.original.title}</p>
            <p className="line-clamp-2">{row.original.description}</p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'quantity',
    header: () => <p>Quantity</p>,
    cell: ({ row }) => {
      const { setQuantity } = useCart()
      const [val, setVal] = useState(row.original.quantity)

      /**
       * Checks if quantity input is a number value that is greater than -1.
       */
      function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (Number(event.target.value) > -1) {
          setVal(Number(event.target.value))
        }
      }

      /**
       * Makes sure value is greater than 0 on blur else it will revert to original value before saving value to cart context.
       */
      function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
        if (Number(event.target.value) > 0) {
          setQuantity(
            row.original.id,
            Number(event.target.value) > 0 ? Number(event.target.value) : 1
          )
          setVal(
            Number(event.target.value) > 0 ? Number(event.target.value) : 1
          )
        } else {
          setQuantity(row.original.id, row.original.quantity)
          setVal(row.original.quantity)
        }
      }

      return (
        <div className="flex items-center justify-evenly gap-1 bg-muted rounded-full border shadow-sm overflow-hidden select-none max-md:min-w-36">
          <button
            aria-label="Decrement quantity"
            disabled={row.original.quantity === 1}
            onClick={() => {
              setQuantity(row.original.id, row.original.quantity - 1)
              setVal(row.original.quantity - 1)
            }}
            className="focus-visible:bg-muted-foreground/20 hover:bg-muted-foreground/20 active:bg-muted-foreground/10 flex-1 outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50">
            -
          </button>
          <input
            min={1}
            value={val}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onKeyDown={(e) => e.key === 'Enter' ? e.currentTarget.blur() : null}
            className="text-center flex-1 max-w-12 outline-none"
          />
          <button
            aria-label="Increment quantity"
            onClick={() => {
              setQuantity(row.original.id, row.original.quantity + 1)
              setVal(row.original.quantity + 1)
            }}
            className="focus-visible:bg-muted-foreground/20 hover:bg-muted-foreground/20 active:bg-muted-foreground/10 flex-1 outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50">
            +
          </button>
        </div>
      )
    },
  },
  {
    accessorKey: 'discountedPrice',
    header: () => <p>Price</p>,
    cell: ({ row }) => (
      <p aria-label="quantity x price" className="text-center min-w-40">
        ${(row.original.discountedPrice * row.original.quantity).toFixed(2)}
      </p>
    ),
  },
  {
    header: 'Action',
    cell: ({ row }) => {
      const { removeItem } = useCart()
      return (
        <div className="flex items-center">
          <Button
            title="Remove item"
            size="icon"
            variant="ghost"
            onClick={() => removeItem(row.original.id)}
            className="mx-auto">
            <X />
          </Button>
        </div>
      )
    },
  },
]
