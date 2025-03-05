import { db } from '@/lib/database'
import { cn } from '@/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import RatingStars from '../product/rating-stars'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function ProductsList() {
  const { data } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: db.products.getAll,
  })

  return (
    <section>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-8">
        {data?.data.map((item) => {
          const isOnSale = item.price === item.discountedPrice ? false : true

          return (
            <Card
              key={item.id}
              className="relative overflow-hidden group hover:bg-muted/60 dark:hover:bg-muted/20 focus-within:bg-muted/60 dark:focus-within:bg-muted/20 focus-within:ring ring-ring ring-offset-2 ring-offset-background">
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
