import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if (navType === 'POP') return
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
