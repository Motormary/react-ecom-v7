import ActionButton from "./ui/action-button"

type errorProps = {
  refetch: () => void
  isFetching: boolean
  error?: {
    status: number
    statusText: string | undefined
  }
}

export default function ErrorBox({ refetch, isFetching, error }: errorProps) {
  return (
    <div className="grid place-items-center gap-4 py-20">
      <div className="flex gap-4 items-center">
        <p className="text-[clamp(1.25rem,_2.5vw,_var(--text-3xl))] font-semibold">
          {error?.statusText?.length ? error.statusText : "Error"}
        </p>
        <div className="h-10 border-l" />
        <p className="text-[clamp(1rem,_2vw,_var(--text-2xl))] font-semibold">
          {error?.status ?? "404"}
        </p>
      </div>
      <ActionButton
        variant="destructive"
        isPending={isFetching}
        loadingText="Retrying"
        onClick={() => refetch()}>
        Retry
      </ActionButton>
    </div>
  )
}
