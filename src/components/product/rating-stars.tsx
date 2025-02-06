import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

export default function RatingStars({ rating }: { rating: number }) {
  function getFill(index: number): string | undefined {
    const indexValue = index + 1
    if (rating === 0) return 'var(--color-background)'
    if (indexValue <= rating) return 'var(--color-amber-200)'
    if (indexValue === Math.ceil(rating)) return 'url(#halfGradient)'

    return 'var(--color-background)'
  }

  return (
    <div className="flex gap-1 my-2">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i + rating}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="url(#halfGradient)">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="var(--color-amber-300)" />
              <stop offset="50%" stopColor="var(--color-background)" />
            </linearGradient>
          </defs>
          <Star
            className={
              rating !== 0 && i + 1 <= Math.ceil(rating)
                ? 'text-amber-400'
                : 'text-muted-foreground/50'
            }
            fill={getFill(i)}
          />
        </svg>
      ))}
      <span
        className={cn(
          rating === 0
            ? 'hidden'
            : 'hidden group-hover:inline-block text-xs my-auto'
        )}>
        {rating.toFixed(1)}
      </span>
    </div>
  )
}
