import React, { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { CUSTOMERS, ORDERS } from '../../data/products'

export default function AdminCustomers() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('spent')
  const [sortDir, setSortDir] = useState('desc')
  const [expandedCustomer, setExpandedCustomer] = useState(null)

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir('desc') }
  }

  const filtered = CUSTOMERS
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aVal = sortBy === 'spent' ? a.totalSpent : sortBy === 'orders' ? a.totalOrders : a.name
      const bVal = sortBy === 'spent' ? b.totalSpent : sortBy === 'orders' ? b.totalOrders : b.name
      return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
    })

  const getCustomerOrders = (customerEmail) =>
    ORDERS.filter(o => o.email === customerEmail)

  const SortIcon = ({ col }) => (
    <span className="ml-1 inline-flex">
      {sortBy === col ? (sortDir === 'asc' ? <ChevronUp size={10} /> : <ChevronDown size={10} />) : <ChevronDown size={10} className="opacity-30" />}
    </span>
  )

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="mb-8">
          <h1 className="font-sans text-2xl font-semibold text-charcoal">Customers</h1>
          <p className="text-sm text-charcoal/50 font-sans mt-1">{CUSTOMERS.length} registered customers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Customers', value: CUSTOMERS.length },
            { label: 'Total Revenue', value: `Rs. ${CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0).toLocaleString()}` },
            { label: 'Avg. Lifetime Value', value: `Rs. ${Math.round(CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0) / CUSTOMERS.length).toLocaleString()}` },
          ].map(s => (
            <div key={s.label} className="bg-white p-5 rounded border border-gray-100">
              <p className="text-2xl font-sans font-semibold text-charcoal">{s.value}</p>
              <p className="text-xs text-charcoal/40 font-sans mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full md:w-80 pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded text-sm font-sans focus:outline-none focus:border-sand transition-colors" />
        </div>

        {/* Customers table */}
        <div className="bg-white rounded border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 text-[10px] tracking-widest uppercase font-sans font-medium text-charcoal/40">
                    <button onClick={() => toggleSort('name')} className="flex items-center">Customer <SortIcon col="name" /></button>
                  </th>
                  <th className="text-left px-6 py-3 text-[10px] tracking-widest uppercase font-sans font-medium text-charcoal/40">Location</th>
                  <th className="text-left px-6 py-3 text-[10px] tracking-widest uppercase font-sans font-medium text-charcoal/40">
                    <button onClick={() => toggleSort('orders')} className="flex items-center">Orders <SortIcon col="orders" /></button>
                  </th>
                  <th className="text-left px-6 py-3 text-[10px] tracking-widest uppercase font-sans font-medium text-charcoal/40">
                    <button onClick={() => toggleSort('spent')} className="flex items-center">Total Spent <SortIcon col="spent" /></button>
                  </th>
                  <th className="text-left px-6 py-3 text-[10px] tracking-widest uppercase font-sans font-medium text-charcoal/40">Joined</th>
                  <th className="text-left px-6 py-3 text-[10px] tracking-widest uppercase font-sans font-medium text-charcoal/40"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(customer => (
                  <React.Fragment key={customer.id}>
                    <tr className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer ${expandedCustomer === customer.id ? 'bg-gray-50' : ''}`}
                      onClick={() => setExpandedCustomer(expandedCustomer === customer.id ? null : customer.id)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={customer.avatar} alt={customer.name} className="w-9 h-9 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-sans font-medium text-charcoal">{customer.name}</p>
                            <p className="text-xs text-charcoal/40 font-sans">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-sans text-charcoal/60">{customer.location}</td>
                      <td className="px-6 py-4 text-sm font-sans font-medium text-charcoal">{customer.totalOrders}</td>
                      <td className="px-6 py-4 text-sm font-sans font-semibold text-charcoal">Rs. {customer.totalSpent.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm font-sans text-charcoal/60">{customer.joined}</td>
                      <td className="px-6 py-4">
                        <ChevronDown size={14} className={`text-charcoal/30 transition-transform ${expandedCustomer === customer.id ? 'rotate-180' : ''}`} />
                      </td>
                    </tr>

                    {expandedCustomer === customer.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-6 pb-5 pt-2">
                          <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal/40 mb-3">Order History</p>
                          {getCustomerOrders(customer.email).length > 0 ? (
                            <div className="space-y-2">
                              {getCustomerOrders(customer.email).map(order => (
                                <div key={order.id} className="flex items-center justify-between bg-white p-3 rounded border border-gray-100">
                                  <div className="flex items-center gap-4">
                                    <span className="text-xs font-mono text-charcoal/50">{order.id}</span>
                                    <span className="text-xs font-sans text-charcoal/60">{order.date}</span>
                                    <span className="text-xs font-sans text-charcoal">{order.items.reduce((s, i) => s + i.qty, 0)} items</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-sans font-medium text-charcoal">Rs. {order.total.toLocaleString()}</span>
                                    <span className={`text-xs font-sans px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                      {order.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-charcoal/40 font-sans">No orders found for this customer.</p>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}