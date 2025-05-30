import { X } from "lucide-react"
import { useCart } from "../cart-provider"
import { Button } from "../ui/button"

export default function Action({id}: {id: string}) {
  const { removeItem } = useCart()
  return (
    <div className="flex items-center">
      <Button
        title="Remove item"
        size="icon"
        variant="ghost"
        onClick={() => removeItem(id)}
        className="mx-auto">
        <X />
      </Button>
    </div>
  )
}
