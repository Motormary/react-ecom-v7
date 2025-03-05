import { Theme } from '@/components/theme-provider'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

export function getDefaultTheme(): Theme {
  if (typeof window !== 'undefined') {
    const localTheme = localStorage.getItem('__ECOM_THEME') as Theme
    if (localTheme) return localTheme

    const dataTheme = document.documentElement.dataset.theme as Theme
    if (dataTheme) {
      return dataTheme
    }
  }
  return 'dark'
}

let transitionDisabled = false;

export function disableTransition() {
  if (typeof window === 'undefined' || transitionDisabled) return;
  transitionDisabled = true;

  const root = document.documentElement;
  root.classList.add('[&_*]:transition-none');

  //! Don't edit.
  //? Makes sure we wait for the second frame to safely remove the transition-none class.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove('[&_*]:transition-none');
      transitionDisabled = false;
    });
  });
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});