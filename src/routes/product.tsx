import { useParams } from 'react-router'

export default function Product() {
  const { product_id } = useParams()
  return (
    <>
      <h1>Product</h1>
      <p>Product id: {product_id}</p>
    </>
  )
}
