import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useOdooConnection } from '@/hooks/useOdoo'
import { usePerformance } from '@/hooks/usePerformance'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import CatalogPage from '@/pages/CatalogPage'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  const { connect } = useOdooConnection()

  usePerformance()

  useEffect(() => {
    connect()
  }, [connect])

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col">
      <Navbar />
      <CartDrawer />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/produits" element={<CatalogPage />} />
          <Route path="/produits/:id" element={<ProductPage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#07070e',
            color: '#f0f0f5',
            border: '1px solid #18182a',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#c8ff00',
              secondary: '#030308',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4d4d',
              secondary: '#030308',
            },
          },
        }}
      />
    </div>
  )
}
