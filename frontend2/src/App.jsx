import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductPage from './pages/Product'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminCustomers from './pages/admin/AdminCustomers'
import AdminMessages from './pages/admin/AdminMessages'
import Checkout from './components/sections/Checkout'
import OrderConfirmation from './components/sections/OrderConfirmation'




function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

function StorefrontLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AdminAuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Customer storefront */}
            <Route path="/" element={<StorefrontLayout><Home /></StorefrontLayout>} />
            <Route path="/collection" element={<StorefrontLayout><Collection /></StorefrontLayout>} />
            <Route path="/product/:slug" element={<StorefrontLayout><ProductPage /></StorefrontLayout>} />
            <Route path="/cart" element={<StorefrontLayout><Cart /></StorefrontLayout>} />
            <Route path="/contact" element={<StorefrontLayout><Contact /></StorefrontLayout>} />
            <Route path="/checkout" element={<StorefrontLayout><Checkout /></StorefrontLayout>} />
<Route path="/order-confirmation" element={<StorefrontLayout><OrderConfirmation /></StorefrontLayout>} />


            {/* Admin login (public) */}
            <Route path="/admin/login" element={<AdminLogin />} />


            {/* Admin routes — protected behind login */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
            <Route path="/admin/customers" element={<ProtectedRoute><AdminCustomers /></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AdminAuthProvider>
  )
}