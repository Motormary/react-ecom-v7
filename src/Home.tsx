import ProductsList from './components/home/products'
import { Input } from './components/ui/input'

function Home() {
  return (
    <>
      <h1 className="sr-only">Home</h1>
      <div className="flex justify-center">
        <Input type="text" />
      </div>
      <ProductsList />
    </>
  )
}

export default Home
