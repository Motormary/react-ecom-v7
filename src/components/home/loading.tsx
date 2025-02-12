import RatingStars from '../product/rating-stars'
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card'

export default function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-8">
      {Array.from({ length: 15 }).map((_, index) => {
        return (
          <Card key={index} className="relative overflow-hidden">
            <div className="relative mx-auto overflow-hidden h-80 border-muted border-8 bg-muted animate-pulse"></div>
            <CardHeader>
              <CardTitle className="text-background">Title</CardTitle>
              <CardDescription>
                <RatingStars rating={0} />
                <p className="text-background">description</p>
                <br />
                <br />
              </CardDescription>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}
