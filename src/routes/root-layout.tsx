import { ThemeProvider } from '@/components/theme-provider'
import ThemeToggleButton from '@/components/theme-toggle-button'
import { Link, Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <ThemeProvider>
      <header>
        <div className="border-b">
          <nav className="flex justify-between items-center container px-4 border-x mx-auto h-full top">
            <div className="p-3 border rounded-full">Logo</div>
            <ul className="[&>li]:inline-block space-x-6">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/product/123">Product</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="border-x container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="mx-auto container flex items-center justify-center py-4">footer</div>
      </footer>
      <ThemeToggleButton />
    </ThemeProvider>
  )
}
