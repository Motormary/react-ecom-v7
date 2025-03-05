import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'motion/react'
import { FormEvent, useRef, useState } from 'react'

export default function Contact() {
  const [isPending, setIsPending] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setIsPending(true)
  }
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-center">Contact</h1>
        <h2 className="text-lg font-normal text-center">
          Please fill out the form below and we'll get back to you as soon as
          possible
        </h2>
      </div>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center gap-4 [&>*]:max-w-[30rem] [&>*]:w-full">
        <div>
          <label htmlFor="name">Full Name</label>
          <Input required name="name" minLength={3} placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <Input required name="subject" minLength={3} placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input required name="email" type="email" placeholder="John Doe" />
        </div>
        <div className="grid">
          <label htmlFor="body">Body</label>
          <textarea
            required
            name="body"
            minLength={3}
            className="rounded-md p-2 border"
          />
        </div>
        <Button type="submit">
          <AnimatePresence initial={false} mode="popLayout">
            {!isPending ? (
              <motion.div
                key="submit"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}>
                Submit
              </motion.div>
            ) : (
              <motion.div
                key="success"
                onAnimationComplete={() =>
                  setTimeout(() => {
                    setIsPending(false)
                    if (formRef.current) formRef.current.reset()
                  }, 1500)
                }
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}>
                Success!
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </form>
    </div>
  )
}
