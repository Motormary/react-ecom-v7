import { useCart } from '@/components/cart-provider'
import ErrorBox from '@/components/error'
import RatingStars from '@/components/product/rating-stars'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/database'
import { useQuery } from '@tanstack/react-query'
import { RefreshCw } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'

export default function Product() {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { product_id } = useParams()
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ['products', product_id],
    queryFn: () => db.products.get(product_id as string),
  })

  if (isPending)
    return (
      <div className="py-20 grid place-items-center">
        <RefreshCw className="animate-spin size-10" />
      </div>
    )

  if (error) {
    const parsedError = (error?.message && JSON.parse(error.message)) ?? null
    return (
      <div className="py-20 grid place-items-center gap-4">
        <ErrorBox error={parsedError} refetch={refetch} />
      </div>
    )
  }
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <img
            src={data.data.image.url || '/placeholder.svg'}
            alt={data.data.image.alt || data.data.title}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{data.data.title}</h1>
          <div className="flex gap-1 items-center mb-4">
            <RatingStars rating={data.data.rating} />
            <span className="text-xs">
              ({data.data.reviews.length} reviews)
            </span>
          </div>
          <p className="text-muted-foreground mb-6">{data.data.description}</p>
          <div className="flex items-center mb-6">
            {data.data.discountedPrice ? (
              <>
                <span className="text-3xl font-bold text-destructive mr-2">
                  ${data.data.discountedPrice.toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground/80 line-through">
                  ${data.data.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold">
                ${data.data.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-2">Tags:</h2>
            <div className="flex flex-wrap gap-2">
              {data.data.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Button className="w-full" onClick={() => addItem(data.data)}>
              Add to cart
            </Button>
            <div className='flex items-center gap-2'>
              <div className="border-b w-full" />
              <p className='text-muted-foreground'>or</p>
              <div className="border-b w-full" />
            </div>
            <Button variant="secondary" onClick={() => {
              addItem(data.data)
              navigate("/checkout")
            }}>Buy and checkout</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
