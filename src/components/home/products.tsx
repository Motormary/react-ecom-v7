import { db } from '@/lib/database'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { RefreshCw } from 'lucide-react'
import { Link } from 'react-router'
import ErrorBox from '../error'
import RatingStars from '../product/rating-stars'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function ProductsList() {
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: db.products.getAll,
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
    <section>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-8">
        {data?.data.map((item, index) => {
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
                    index % 2 === 0 && 'hidden',
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
