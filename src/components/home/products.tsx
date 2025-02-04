import { db } from '@/lib/database'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { RefreshCw, Star } from 'lucide-react'
import { Link } from 'react-router'
import ErrorBox from '../error'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function ProductsList() {
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: db.products.getAll,
    retry: false,
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
        {data?.data.map((item, index) => {
          if (index === 0) console.log(item.rating)
          console.log(item.rating)
          return (
            <Card key={item.id} className="relative">
              <Link
                to={`/product/${item.id}`}
                className="absolute inset-0 z-10"
              />
              <div className="relative mx-auto overflow-hidden w-64 h-64 py-4 px-2">
                <img
                  className="rounded-md object-cover w-full h-full"
                  src={item.image.url}
                  alt={item.image.alt}
                />
                <div
                  className={cn(
                    index % 2 === 0 && 'hidden',
                    'absolute top-4 left-2 bg-green-600 rounded-md p-1 px-2 shadow-sm select-none'
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

function RatingStars({ rating }: { rating: number }) {
  function getFill(index: number): string {
    if (rating === 0) return ''
    if (rating !== 0 && Math.floor(rating) % rating !== 0)
      return 'url(#halfGradient)'
    if (index < rating) return 'var(--color-amber-200)'
    return ''
  }
  return (
    <div className="flex gap-1 my-2">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="url(#halfGradient)">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="var(--color-amber-200)" />
              <stop offset="50%" stopColor="var(--color-transparent)" />
            </linearGradient>
          </defs>
          <Star className={i <= Math.ceil(rating) ? "text-amber-200" : ""} fill={getFill(i)} />
        </svg>
      ))}
    </div>
  )
}

/* 
        <Star
          key={i}
          className={cn(
            i < Math.floor(rating) ? 'text-amber-200 fill-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]' : '',
            'size-4'
          )}
        />
         */
