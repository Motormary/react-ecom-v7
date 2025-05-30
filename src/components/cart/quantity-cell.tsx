import { useState } from 'react'
import { useCart } from '../cart-provider'

export default function Quantity({
  id,
  quantity,
}: {
  id: string
  quantity: number
}) {
  const { setQuantity } = useCart()
  const [val, setVal] = useState(quantity)

  /**
   * Checks if quantity input is a number value that is greater than -1.
   */
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value) > -1) {
      setVal(Number(event.target.value))
    }
  }

  /**
   * Makes sure value is greater than 0 on blur else it will revert to original value before saving value to cart context.
   */
  function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (Number(event.target.value) > 0) {
      setQuantity(
        id,
        Number(event.target.value) > 0 ? Number(event.target.value) : 1
      )
      setVal(Number(event.target.value) > 0 ? Number(event.target.value) : 1)
    } else {
      setQuantity(id, quantity)
      setVal(quantity)
    }
  }

  return (
    <div className="flex items-center justify-evenly gap-1 bg-muted rounded-full border shadow-sm overflow-hidden select-none max-md:min-w-36">
      <button
        aria-label="Decrement quantity"
        disabled={quantity === 1}
        onClick={() => {
          setQuantity(id, quantity - 1)
          setVal(quantity - 1)
        }}
        className="focus-visible:bg-muted-foreground/20 hover:bg-muted-foreground/20 active:bg-muted-foreground/10 flex-1 outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50">
        -
      </button>
      <input
        min={1}
        value={val}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={(e) => (e.key === 'Enter' ? e.currentTarget.blur() : null)}
        className="text-center flex-1 max-w-12 outline-none"
      />
      <button
        aria-label="Increment quantity"
        onClick={() => {
          setQuantity(id, quantity + 1)
          setVal(quantity + 1)
        }}
        className="focus-visible:bg-muted-foreground/20 hover:bg-muted-foreground/20 active:bg-muted-foreground/10 flex-1 outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50">
        +
      </button>
    </div>
  )
}
