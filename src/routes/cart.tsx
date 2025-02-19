import { useCart } from '@/components/cart-provider'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TYPE_CART } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

const columns: ColumnDef<TYPE_CART>[] = [
  {
    accessorKey: 'image',
    header: () => null,
    cell: ({ row }) => {
      return (
        <div className="relative flex items-center gap-4 group">
          <Link
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
            onChange={({ target }) => {
              if (Number(target.value) > -1) {
                setVal(Number(target.value))
              }
            }}
            onBlur={({ target }) => {
              if (Number(target.value) > 0) {
                setQuantity(
                  row.original.id,
                  Number(target.value) > 0 ? Number(target.value) : 1
                )
                setVal(Number(target.value) > 0 ? Number(target.value) : 1)
              } else {
                setQuantity(row.original.id, row.original.quantity)
                setVal(row.original.quantity)
              }
            }}
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

export default function Cart() {
  const { cart, cartPrice, cartQuantity } = useCart()
  const table = useReactTable({
    data: cart,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <section className="space-y-8">
      <h1>Cart</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-36 text-center">
                  Cart is empty
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <div className="text-end space-y-2">
          <p className="text-muted-foreground">Total:</p>
          <p>{cartPrice()}</p>
          <button
            disabled={!cart.length}
            className="disabled:pointer-events-none disabled:select-none disabled:opacity-50">
            <Link
              className={cn(buttonVariants({ variant: 'default' }))}
              to="/checkout">
              Checkout
            </Link>
          </button>
        </div>
      </div>
    </section>
  )
}
