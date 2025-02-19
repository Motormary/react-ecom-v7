import { useNavigate } from 'react-router'

export function useViewTransition(path: string) {
  const navigate = useNavigate()

  function transitionTo() {
    if (!document.startViewTransition) {
      navigate(path) // Fallback for unsupported browsers
      return
    }

    document.startViewTransition(() => {
      navigate(path)
    })
  }

  return transitionTo
}
