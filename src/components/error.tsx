import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Button } from './ui/button'

type errorProps = {
  refetch: () => void
  error?: {
    message: string
  }
}

type parsedProps = {
  statusCode?: number
  status?: string
}

export default function ErrorBox({ refetch, error }: errorProps) {
  const location = useLocation()
  const [originalErrorPath] = useState<string | undefined>(location.pathname ?? '')

  // If the user changes path while there was an error, refetch to avoid errorBoundary persisting with previous error.
  useEffect(() => {
    if (originalErrorPath !== location.pathname) {
      refetch()
    }
  }, [location.pathname])

  const parsedError: parsedProps =
    typeof error?.message === 'string' ? JSON.parse(error.message) : null

  return (
    <div className="grid place-items-center gap-4 py-20">
      <div className="flex gap-4 items-center">
        <p
          className={
            'text-[clamp(1.25rem,_2.5vw,_var(--text-3xl))] font-semibold'
          }>
          {parsedError?.statusCode ?? '404'}
        </p>
        <div className={'h-10 border-l'} />
        <p className={'text-[clamp(1rem,_2vw,_var(--text-2xl))] font-semibold'}>
          {parsedError?.status?.length ? parsedError.status : 'Error'}
        </p>
      </div>
      <Button variant="destructive" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  )
}
