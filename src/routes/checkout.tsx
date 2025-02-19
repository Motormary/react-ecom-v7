import { AnimatePresence, motion } from 'motion/react'
import { useLocation } from 'react-router'

export default function Checkout() {
  const { state } = useLocation()
  return (
    <AnimatePresence initial={state}>
      <motion.div
        initial={{ translateX: '-100%' }}
        animate={{ translateX: '0%' }}>
        <section className="space-y-8">
          <h1>Checkout</h1>
        </section>
      </motion.div>
    </AnimatePresence>
  )
}
