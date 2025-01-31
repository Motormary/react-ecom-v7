import { MoonIcon, SunIcon } from 'lucide-react'
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
          <TooltipTrigger className="fixed bottom-3 left-4 z-50">
            <div
              className="bg-secondary border rounded-full p-2 hover:cursor-pointer"
              onClick={toggleTheme}>
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

  return null
}
