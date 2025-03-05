import { useCart } from '@/components/cart-provider'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { Link, redirect } from 'react-router'

export default function CheckoutSuccess() {
  const { emptyCart, cartQuantity } = useCart()

  useEffect(() => {
    if (cartQuantity() <= 0) redirect('/')
    emptyCart()
  }, [])
  return (
    <div className="grid place-items-center gap-8 m-auto">
      <h1>Checkout Success!</h1>
      <p>
        Your order id:{' '}
        {(Math.random() * (12321311241 - 9812973981) + 12321311241).toFixed(0)}
      </p>
      <Link to={'/'} className={cn(buttonVariants({ variant: 'secondary' }))}>
        Back to Shop
      </Link>
    </div>
  )
}
