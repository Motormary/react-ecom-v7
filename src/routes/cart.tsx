import { useCart } from '@/components/cart-provider'
import { columns } from '@/components/cart/column'
import { buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Link } from 'react-router'

export default function Cart() {
  const { cart, cartPrice } = useCart()
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
              draggable={false}
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
