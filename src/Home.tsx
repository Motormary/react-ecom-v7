import { Suspense } from 'react'
import ProductsList from './components/home/products'
import ProductListSkeleton from './components/home/loading'

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
