import { Suspense } from 'react'
import ProductsList from './components/home/products'
import RatingStars from './components/product/rating-stars'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'

function Home() {
  return (
    <>
      <h1 className="sr-only">Home</h1>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductsList />
      </Suspense>
    </>
  )
}

export default Home

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-8 animate-pulse">
      {Array.from({ length: 15 }).map((_, index) => {
        return (
          <Card
            key={index}
            className="relative overflow-hidden">
            <div className="relative mx-auto overflow-hidden h-80 border-muted border-8 bg-muted">
 
            </div>
            <CardHeader>
              <CardTitle className='text-background'>Title</CardTitle>
              <CardDescription>
                <RatingStars rating={0} />
                <p className='text-background'>description</p>
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
