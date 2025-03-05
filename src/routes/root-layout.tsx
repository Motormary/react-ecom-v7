import { CartProvider } from '@/components/cart-provider'
import ShoppingCartCTA from '@/components/cart/cart-cta'
import ErrorBox from '@/components/error'
import ScrollToTop from '@/components/scroll-to-top'
import { ThemeProvider } from '@/components/theme-provider'
import ThemeToggleButton from '@/components/theme-toggle-button'
import TopNav from '@/components/top-nav'
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Link, Outlet } from 'react-router'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <>
                <header>
                  <TopNav />
                </header>
                <main className="container mx-auto px-5 md:px-10 py-4 md:py-10 flex flex-col">
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary, error }) => (
                      <div className="py-20 grid place-items-center gap-4">
                        <ErrorBox refetch={resetErrorBoundary} error={error} />
                      </div>
                    )}>
                    <Outlet />
                    <ScrollToTop />
                  </ErrorBoundary>
                </main>
              </>
            )}
          </QueryErrorResetBoundary>
          <footer className="border-t">
            <div className="mx-auto container flex items-center justify-center py-4">
              <ul className="flex items-center gap-8">
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </footer>
          <ShoppingCartCTA />
        </CartProvider>
      </QueryClientProvider>
      <ThemeToggleButton />
    </ThemeProvider>
  )
}
