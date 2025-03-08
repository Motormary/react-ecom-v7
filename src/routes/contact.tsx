import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'motion/react'
import { FormEvent, useRef, useState } from 'react'

export default function Contact() {
  const [isPending, setIsPending] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.table([...new FormData(e.currentTarget)])
    e.preventDefault()
    setIsPending(true)
  }
  return (
    <fieldset className="space-y-4 pb-10 pt-4 px-6 md:p-10 md:pb-16 sm:border rounded-lg">
      <legend className="px-2 text-center max-sm:w-full sm:border-none rounded-lg">
        <h1>Contact Form</h1>
      </legend>
      <div>
        <h2 className="text-base font-normal text-center">
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
            className="rounded-md p-2 border w-full flex"
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
    </fieldset>
  )
}
