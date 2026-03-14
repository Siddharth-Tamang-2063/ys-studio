import React, { useState } from 'react'
import { Search, ChevronDown, Eye } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { ORDERS, PRODUCTS } from '../../data/products'

const STATUS_COLORS = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-blue-100 text-blue-700',
  Pending: 'bg-amber-100 text-amber-700',
}

const STATUSES = ['Pending', 'Processing', 'Delivered']

export default function AdminOrders() {
  const [orders, setOrders] = useState(ORDERS)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState(null)

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || o.status === filterStatus
    return matchSearch && matchStatus
  })

  const updateStatus = (id, status) => {
    setOrders(os => os.map(o => o.id === id ? { ...o, status } : o))
    setUpdatingStatus(null)
  }

  const getProductName = (productId) => PRODUCTS.find(p => p.id === productId)?.name || 'Unknown'
  const getProductImg = (productId) => PRODUCTS.find(p => p.id === productId)?.images[0]

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    revenue: orders.reduce((s, o) => s + o.total, 0),
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="mb-8">
          <h1 className="font-sans text-2xl font-semibold text-charcoal">Orders</h1>
          <p className="text-sm text-charcoal/50 font-sans mt-1">{orders.length} total orders</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: stats.total, color: 'text-charcoal' },
            { label: 'Pending', value: stats.pending, color: 'text-amber-600' },
            { label: 'Processing', value: stats.processing, color: 'text-blue-600' },
            { label: 'Delivered', value: stats.delivered, color: 'text-emerald-600' },
          ].map(s => (
            <div key={s.label} className="bg-white p-5 rounded border border-gray-100">
              <p className={`text-2xl font-sans font-semibold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-charcoal/40 font-sans mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search orders or customers..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded text-sm font-sans focus:outline-none focus:border-sand transition-colors" />
          </div>

          <div className="flex gap-2">
            {['all', ...STATUSES].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-sans font-medium rounded transition-all ${filterStatus === s ? 'bg-charcoal text-cream' : 'bg-white text-charcoal/50 border border-gray-100 hover:text-charcoal'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Orders table */}
        <div className="bg-white rounded border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] tracking-widest uppercase font-sans font-medium text-charcoal/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <React.Fragment key={order.id}>
                    <tr className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${expandedOrder === order.id ? 'bg-gray-50' : ''}`}>
                      <td className="px-6 py-4 text-sm font-mono text-charcoal/70">{order.id}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-sans font-medium text-charcoal">{order.customer}</p>
                        <p className="text-xs text-charcoal/40 font-sans">{order.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-sans text-charcoal/60 whitespace-nowrap">{order.date}</td>
                      <td className="px-6 py-4 text-sm font-sans text-charcoal">
                        {order.items.reduce((s, i) => s + i.qty, 0)} items
                      </td>
                      <td className="px-6 py-4 text-sm font-sans font-semibold text-charcoal">Rs. {order.total}</td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          {updatingStatus === order.id ? (
                            <select autoFocus onBlur={() => setUpdatingStatus(null)}
                              onChange={e => updateStatus(order.id, e.target.value)}
                              defaultValue={order.status}
                              className="text-xs font-sans font-medium px-3 py-1.5 rounded-full border border-sand focus:outline-none bg-white appearance-none pr-6 cursor-pointer">
                              {STATUSES.map(s => <option key={s}>{s}</option>)}
                            </select>
                          ) : (
                            <button onClick={() => setUpdatingStatus(order.id)}
                              className={`text-xs font-sans font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${STATUS_COLORS[order.status]}`}>
                              {order.status}
                              <ChevronDown size={10} />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                          className="w-8 h-8 flex items-center justify-center text-charcoal/40 hover:text-charcoal hover:bg-gray-100 rounded transition-all">
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>

                    {/* Expanded row */}
                    {expandedOrder === order.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="flex flex-wrap gap-4">
                            <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal/40 w-full">Order Items</p>
                            {order.items.map((item, i) => {
                              const p = PRODUCTS.find(prod => prod.id === item.productId)
                              return p ? (
                                <div key={i} className="flex items-center gap-3 bg-white p-3 rounded border border-gray-100">
                                  <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover" />
                                  <div>
                                    <p className="text-sm font-sans font-medium text-charcoal">{p.name}</p>
                                    <p className="text-xs text-charcoal/50 font-sans">Size: {item.size} · Qty: {item.qty}</p>
                                    <p className="text-xs text-charcoal font-sans font-medium mt-1">Rs. {(p.price * item.qty).toLocaleString()}</p>
                                  </div>
                                </div>
                              ) : null
                            })}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="font-sans text-charcoal/40 text-sm">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}