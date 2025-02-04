import { Button } from './ui/button'

type errorProps = {
  refetch: () => void
  error?: {
    status: string
    statusCode: number | undefined
  }
}

export default function ErrorBox({ refetch, error }: errorProps) {
  return (
    <div className="grid place-items-center gap-4 py-20">
      <div className="flex gap-4 items-center">
        <p
          className={
            'text-[clamp(1.25rem,_2.5vw,_var(--text-3xl))] font-semibold'
          }>
          {error?.statusCode ?? '404'}
        </p>
        <div className={'h-10 border-l'} />
        <p className={'text-[clamp(1rem,_2vw,_var(--text-2xl))] font-semibold'}>
          {error?.status?.length ? error.status : 'Error'}
        </p>
      </div>
      <Button variant="destructive" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  )
}
