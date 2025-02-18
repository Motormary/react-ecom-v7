import { useCart } from '@/components/cart-provider'
import ErrorBox from '@/components/error'
import RatingStars from '@/components/product/rating-stars'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { db } from '@/lib/database'
import { cn } from '@/lib/utils'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router'

export default function Product() {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { product_id } = useParams()
  const { data } = useSuspenseQuery({
    queryKey: ['products', product_id],
    queryFn: () => db.products.get(product_id as string),
    retry: false, // todo: remove
  })

  /*   if (error) {
    const parsedError = (error?.message && JSON.parse(error.message)) ?? null
    return (
      <div className="py-20 grid place-items-center gap-4">
        <ErrorBox error={parsedError} refetch={refetch} />
      </div>
    )
  }
 */
  const isOnSale = data.data.price === data.data.discountedPrice ? false : true

  return (
    <>
      <section className="border-b py-10">
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
              <a
                href="#reviews"
                className={cn(!data.data.reviews?.length && 'cursor-default')}>
                <RatingStars rating={data.data.rating} />
              </a>
              <span className="text-xs">
                ({data.data.reviews.length} reviews)
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              {data.data.description}
            </p>
            <div className="flex items-center mb-6">
              {isOnSale ? (
                <>
                  <span className="text-3xl font-bold text-green-600 mr-2">
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
              <div className="flex items-center gap-2">
                <div className="border-b w-full" />
                <p className="text-muted-foreground">or</p>
                <div className="border-b w-full" />
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  addItem(data.data)
                  navigate('/checkout')
                }}>
                Buy and checkout
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex max-lg:flex-col-reverse justify-between gap-10 py-4 sm:py-10">
        <OtherPosts product_id={product_id as string} />
        <div
          className={cn(
            !data.data.reviews?.length && 'hidden',
            'border-l max-lg:hidden'
          )}
        />
        {data.data.reviews?.length ? (
          <section
            id="reviews"
            className="flex flex-col gap-4 flex-1 max-lg:border-b">
            <h1 className="text-xl">Product reviews</h1>
            {data.data.reviews.map((rev, index) => {
              return (
                <div
                  key={rev.id}
                  className={cn(
                    index + 1 !== data.data.reviews.length && 'border-b',
                    'group py-4 w-full'
                  )}>
                  <RatingStars visible size={14} rating={rev.rating} />
                  <p>{rev.username}</p>
                  <p>{rev.description}</p>
                </div>
              )
            })}
          </section>
        ) : null}
      </div>
    </>
  )
}

function OtherPosts({ product_id }: { product_id: string }) {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: db.products.getAll,
  })

  if (isPending)
    return <section className="flex-1 rounded-lg animate-pulse bg-muted/20" />

  if (error) {
    const parsedError = (error?.message && JSON.parse(error.message)) ?? null
    return (
      <div className="py-20 grid place-items-center gap-4">
        <ErrorBox error={parsedError} refetch={refetch} />
      </div>
    )
  }

  const sliceAmount = data.data.find((item) => item.id === product_id)?.reviews
    ?.length
    ? 4
    : 5

  return (
    <section className="flex-1 space-y-4">
      <h1 className="text-xl">Other items</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-8">
        {data?.data
          .filter((post) => post.id !== product_id)
          .slice(0, sliceAmount)
          .map((item) => {
            const isOnSale = item.price === item.discountedPrice ? false : true

            return (
              <Card
                key={item.id}
                className="relative overflow-hidden group hover:bg-muted/60 dark:hover:bg-muted/20">
                <Link
                  to={`/product/${item.id}`}
                  className="absolute inset-0 z-10 peer"
                />
                <div className="relative mx-auto overflow-hidden h-80 border-muted border-8 bg-muted">
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src={item.image.url}
                    alt={item.image.alt}
                  />
                  <div
                    className={cn(
                      !isOnSale && 'hidden',
                      'absolute top-0 left-0 bg-green-600 rounded-md p-1 px-2 shadow-sm select-none'
                    )}>
                    <p className="text-white font-semibold drop-shadow-sm">
                      SALE
                    </p>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>
                    <RatingStars rating={item?.rating} />
                    <p>{item.description}</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
      </div>
    </section>
  )
}
