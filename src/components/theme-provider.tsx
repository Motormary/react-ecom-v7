import { disableTransition, getDefaultTheme } from '@/lib/utils'
import type React from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Theme = 'light' | 'dark' | undefined

type ThemeContextType = {
  isMounted: boolean
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => getDefaultTheme())
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleTheme = () => {
    disableTransition()
    const newTheme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = newTheme
    localStorage.setItem('__ECOM_THEME', newTheme)
    setTheme(newTheme as Theme)
  }

  const contextValue = useMemo(
    () => ({ isMounted, theme, toggleTheme }),
    [isMounted, theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
