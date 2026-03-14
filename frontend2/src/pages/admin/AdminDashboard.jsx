import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, ShoppingCart, Users, Package, DollarSign, ArrowRight } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { ORDERS, CUSTOMERS, PRODUCTS } from '../../data/products'

const STATS = [
  {
    label: 'Total Revenue',
    value: 'Rs. 8,45,000',
    change: '+12.5%',
    up: true,
    icon: DollarSign,
    color: 'bg-emerald-50 text-emerald-600',
    desc: 'vs last month',
  },
  {
    label: 'Total Orders',
    value: '184',
    change: '+8.2%',
    up: true,
    icon: ShoppingCart,
    color: 'bg-blue-50 text-blue-600',
    desc: 'vs last month',
  },
  {
    label: 'Active Customers',
    value: '1,240',
    change: '+5.1%',
    up: true,
    icon: Users,
    color: 'bg-violet-50 text-violet-600',
    desc: 'vs last month',
  },
  {
    label: 'Products',
    value: PRODUCTS.length.toString(),
    change: '+2',
    up: true,
    icon: Package,
    color: 'bg-amber-50 text-amber-600',
    desc: 'new this week',
  },
]

const CHART_DATA = [
  { month: 'Oct', revenue: 18200, orders: 132 },
  { month: 'Nov', revenue: 22400, orders: 156 },
  { month: 'Dec', revenue: 31600, orders: 214 },
  { month: 'Jan', revenue: 24100, orders: 168 },
  { month: 'Feb', revenue: 26800, orders: 178 },
  { month: 'Mar', revenue: 28450, orders: 184 },
]

const STATUS_COLORS = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-blue-100 text-blue-700',
  Pending: 'bg-amber-100 text-amber-700',
}

function MiniChart({ data }) {
  const max = Math.max(...data.map(d => d.revenue))
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-sand/20 rounded-sm transition-all duration-500 hover:bg-sand/40"
            style={{ height: `${(d.revenue / max) * 100}%`, minHeight: '4px' }}
            title={`${d.month}: Rs. ${d.revenue.toLocaleString()}`}
          />
        </div>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="max-w-7xl">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-sans text-2xl font-semibold text-charcoal">Dashboard</h1>
          <p className="text-sm text-charcoal/50 font-sans mt-1">Welcome back. Here's what's happening with Level Up Fashion today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map(stat => (
            <div key={stat.label} className="bg-white p-5 rounded border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={18} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-sans font-medium ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.change}
                </div>
              </div>
              <p className="font-sans text-2xl font-semibold text-charcoal">{stat.value}</p>
              <p className="text-xs text-charcoal/40 font-sans mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-sans font-semibold text-charcoal">Revenue Overview</h3>
                <p className="text-xs text-charcoal/40 font-sans mt-0.5">Last 6 months</p>
              </div>
              <span className="text-xs font-sans font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+12.5%</span>
            </div>

            <MiniChart data={CHART_DATA} />

            <div className="flex items-end gap-1 mt-1">
              {CHART_DATA.map(d => (
                <div key={d.month} className="flex-1 text-center">
                  <p className="text-[10px] text-charcoal/30 font-sans">{d.month}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex gap-6">
              <div>
                <p className="text-xs text-charcoal/40 font-sans">Total Revenue</p>
                <p className="font-sans font-semibold text-charcoal">Rs. 45,50,000</p>
              </div>
              <div>
                <p className="text-xs text-charcoal/40 font-sans">Total Orders</p>
                <p className="font-sans font-semibold text-charcoal">1,032</p>
              </div>
              <div>
                <p className="text-xs text-charcoal/40 font-sans">Avg. Order Value</p>
                <p className="font-sans font-semibold text-charcoal">Rs. 4,408</p>
              </div>
            </div>
          </div>

          {/* Top products */}
          <div className="bg-white p-6 rounded border border-gray-100">
            <h3 className="font-sans font-semibold text-charcoal mb-4">Top Products</h3>
            <div className="space-y-4">
              {PRODUCTS.slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-charcoal/30 w-4">{i + 1}</span>
                  <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover bg-cream-200 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-sans font-medium text-charcoal truncate">{p.name}</p>
                    <p className="text-xs text-charcoal/40 font-sans">${p.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-sans font-medium text-charcoal">{p.reviews}</p>
                    <p className="text-[10px] text-charcoal/30 font-sans">sold</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded border border-gray-100">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-sans font-semibold text-charcoal">Recent Orders</h3>
            <Link to="/admin/orders" className="text-xs font-sans text-sand hover:text-sand-dark transition-colors flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  {['Order', 'Customer', 'Date', 'Amount', 'Status'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] tracking-widest uppercase font-sans font-medium text-charcoal/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDERS.slice(0, 5).map(order => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-charcoal/70">{order.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-sans font-medium text-charcoal">{order.customer}</p>
                      <p className="text-xs text-charcoal/40 font-sans">{order.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-sans text-charcoal/60">{order.date}</td>
                    <td className="px-6 py-4 text-sm font-sans font-medium text-charcoal">${order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-sans font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}