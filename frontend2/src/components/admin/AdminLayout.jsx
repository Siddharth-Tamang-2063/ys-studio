import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingCart, Users, MessageSquare,
  Menu, X, ExternalLink, Bell, ChevronRight, TrendingUp, LogOut
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages', badge: 2 },
]

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { logout } = useAdminAuth()

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-charcoal z-40 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex-shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 border-b border-white/5">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sand flex items-center justify-center">
                <TrendingUp size={14} className="text-white" />
              </div>
              <div>
                <p className="font-display text-xl font-light text-cream tracking-wider">YS Studio</p>
                <p className="text-[10px] tracking-widest uppercase text-cream/30 font-sans -mt-0.5">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {NAV.map(({ icon: Icon, label, href, badge }) => {
              const active = location.pathname === href
              return (
                <Link key={href} to={href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-sans transition-all duration-150 relative ${active ? 'bg-white/10 text-cream' : 'text-cream/50 hover:text-cream hover:bg-white/5'}`}>
                  <Icon size={16} />
                  {label}
                  {badge && (
                    <span className="ml-auto bg-sand text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full">
                      {badge}
                    </span>
                  )}
                  {active && <ChevronRight size={12} className="ml-auto text-sand" />}
                </Link>
              )
            })}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-white/5 space-y-1">
            <Link to="/" target="_blank"
              className="flex items-center gap-2 px-3 py-2 text-xs tracking-wider uppercase font-sans text-cream/30 hover:text-cream/60 transition-colors">
              <ExternalLink size={12} />
              View Store
            </Link>
            <button onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs tracking-wider uppercase font-sans text-cream/30 hover:text-red-400 transition-colors">
              <LogOut size={12} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
          <button className="lg:hidden text-charcoal" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>

          <div className="hidden lg:block">
            <p className="font-sans text-xs text-charcoal/40">
              {NAV.find(n => n.href === location.pathname)?.label || 'Dashboard'}
            </p>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 text-charcoal/50 hover:text-charcoal transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-gray-100">
              <div className="w-8 h-8 bg-sand rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium font-sans">A</span>
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-medium font-sans text-charcoal">Admin</p>
                <p className="text-[10px] text-charcoal/40 font-sans">admin@YS Studiofashion.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}