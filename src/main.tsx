import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Home.tsx'
import './index.css'
import Cart from './routes/cart.tsx'
import CheckoutSuccess from './routes/checkout-success.tsx'
import Checkout from './routes/checkout.tsx'
import Components from './routes/components.tsx'
import Contact from './routes/contact.tsx'
import Product from './routes/product.tsx'
import RootLayout from './routes/root-layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:product_id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout-success" element={<CheckoutSuccess />} />
          <Route path="contact" element={<Contact />} />
          <Route path="test" element={<Components />} />
          <Route path="*" element={<div>404 Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
