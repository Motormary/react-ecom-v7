import { useCart } from '@/components/cart-provider'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn, formatter } from '@/lib/utils'
import { Check, DollarSign, IdCardIcon, Loader2, PiggyBank } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { ReactNode, useEffect, useState } from 'react'
import { redirect, useLocation, useNavigate } from 'react-router'

export default function Checkout() {
  const { cart, cartPrice, cartQuantity } = useCart()
  const [paying, setPaying] = useState(false)

  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (cartQuantity() <= 0) redirect('/')
  }, [])

  return (
    <AnimatePresence initial={state}>
      <motion.div
        className="pb-10"
        initial={{ translateX: '-100%' }}
        animate={{ translateX: '0%' }}>
        <h1>Checkout</h1>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <section className="space-y-8 md:col-span-2">
            <form className="space-y-8">
              <fieldset className="rounded-lg grid sm:grid-cols-2 gap-4 border p-5 py-10">
                <legend className="px-2">
                  <h2 className="text-xl">Shipping</h2>
                </legend>
                <Placeholder placeholder="Dr. Bombastic" label="Full name" />
                <Placeholder placeholder="Oman" label="Country" />
                <Placeholder placeholder="Lands beyond" label="Province" />
                <Placeholder placeholder="Telefantastic" label="City" />
                <Placeholder placeholder="Mystreet" label="Street" />
                <Placeholder placeholder="2c" label="House / Apartment" />
              </fieldset>
              <fieldset className="rounded-lg space-y-2 border p-5 py-10">
                <legend className="px-2">
                  <h3 className="text-xl">Payment options</h3>
                </legend>
                <div className="flex flex-wrap gap-4">
                  <Option checked id="1">
                    Paypal <DollarSign />
                  </Option>
                  <Option id="2">
                    PiggyBank <PiggyBank />
                  </Option>
                  <Option id="3">
                    Visa <IdCardIcon />{' '}
                  </Option>
                </div>
              </fieldset>
            </form>
          </section>
          <section className="max-h-fit space-y-4 mt-3.5">
            <div className="border p-5 rounded-lg bg-muted/30 text-secondary-foreground">
              <table className="w-full [&_td]:py-1 [&_td]:text-sm [&_td]:first:font-semibold">
                <thead>
                  <tr className="text-left [&>th]:pb-2">
                    <th>Order</th>
                    <th className="text-center">Qty</th>
                    <th className="text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      className="[&>td]:border-b [&>td]:border-muted-foreground/20">
                      <td>{item.title}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">
                        {formatter.format(item.discountedPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Tax</td>
                    <td></td>
                    <td className="text-right">$300</td>
                  </tr>
                  <tr>
                    <td>Shippig</td>
                    <td></td>
                    <td className="text-right">Free</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td></td>
                    <td className="text-right font-semibold">{cartPrice()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="w-full flex justify-end">
              <AnimatePresence>
                <motion.button
                  disabled={paying}
                  key="button"
                  onClick={() => setPaying(true)}
                  animate={
                    paying && { backgroundColor: 'var(--color-green-500)' }
                  }
                  transition={{ delay: 1.2 }}
                  className={cn(
                    buttonVariants(),
                    "max-lg:w-full min-w-40 grid [grid-template-areas:'stack'] disabled:opacity-100"
                  )}>
                  {paying ? (
                    <AnimatePresence>
                      <motion.div
                        key="loader"
                        initial={{
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="[grid-area:stack]">
                        <Loader2 className="animate-spin stroke-3" />
                      </motion.div>
                      <motion.div
                        key="check"
                        initial={{
                          backgroundColor: 'var(--bg-primary)',
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          backgroundColor: 'var(--color-green-500)',
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{ delay: 1.5 }}
                        onAnimationComplete={() => {
                          setTimeout(() => {
                            navigate('/checkout-success')
                          }, 500)
                        }}
                        className="[grid-area:stack] z-10 rounded-full">
                        <Check className="stroke-3" />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <motion.div
                      animate={{ opacity: 1, scale: 1 }}
                      className="[grid-area:stack]">
                      Pay
                    </motion.div>
                  )}
                </motion.button>
              </AnimatePresence>
            </div>
          </section>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function Placeholder({
  label,
  placeholder,
}: {
  label: string
  placeholder: string
}): ReactNode {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <Input
        disabled
        placeholder={placeholder}
        className="mt-1 disabled:opacity-100"
      />
    </div>
  )
}

function Option({
  children,
  id,
  checked,
}: {
  children: ReactNode
  id: string
  checked?: boolean
}): ReactNode {
  return (
    <label
      className={cn(
        buttonVariants({
          variant: 'outline',
        }),
        'has-checked:bg-primary has-checked:text-white select-none flex-1'
      )}
      htmlFor={id}>
      {children}
      <input
        id={id}
        defaultChecked={checked}
        hidden
        className="peer"
        type="radio"
        name="pay"
      />
    </label>
  )
}
