import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import './index.css'
import RootLayout from './routes/root-layout.tsx'
import Product from './routes/product.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path="product/:product_id" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
