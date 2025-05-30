import { TYPE_CART } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router'
import Action from './action-column'
import Quantity from './quantity-cell'

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
    cell: ({ row }) => (
      <Quantity id={row.original.id} quantity={row.original.quantity} />
    ),
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
    cell: ({ row }) => <Action id={row.original.id} />,
  },
]
