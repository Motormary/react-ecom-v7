import { MoonIcon, SunIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from './theme-provider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export default function ThemeToggleButton() {
  const { isMounted, theme, toggleTheme } = useTheme()

  if (isMounted)
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="fixed bottom-3 left-4 z-50">
            <button
              onClick={toggleTheme}
              className="bg-secondary border rounded-full p-2 hover:cursor-pointer">
              {theme === 'light' ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, scale: 0, rotate: '180deg' }}
                  animate={{ opacity: 1, scale: 1, rotate: '0deg' }}>
                  <MoonIcon className="fill-indigo-200 stroke-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, scale: 0, rotate: '180deg' }}
                  animate={{ opacity: 1, scale: 1, rotate: '0deg' }}>
                  <SunIcon className="stroke-amber-200" />
                </motion.div>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

  return null
}
