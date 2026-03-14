import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, X, Check, Star } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { PRODUCTS as INITIAL_PRODUCTS } from '../../data/products'

export default function AdminProducts() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [form, setForm] = useState({ name: '', category: 'tshirts', price: '', description: '' })

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (p) => {
    setEditProduct(p)
    setForm({ name: p.name, category: p.category, price: p.price, description: p.description })
    setShowForm(true)
  }

  const handleSave = () => {
    if (editProduct) {
      setProducts(ps => ps.map(p => p.id === editProduct.id ? { ...p, ...form, price: Number(form.price) } : p))
    } else {
      setProducts(ps => [...ps, {
        id: Date.now(), slug: form.name.toLowerCase().replace(/\s+/g, '-'), ...form,
        price: Number(form.price), images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80'],
        sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White'], rating: 0, reviews: 0,
        isFeatured: false, isTrending: false, inStock: true,
      }])
    }
    setShowForm(false); setEditProduct(null); setForm({ name: '', category: 'tshirts', price: '', description: '' })
  }

  const handleDelete = (id) => {
    setProducts(ps => ps.filter(p => p.id !== id))
    setDeleteConfirm(null)
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-sans text-2xl font-semibold text-charcoal">Products</h1>
            <p className="text-sm text-charcoal/50 font-sans mt-1">{products.length} total products</p>
          </div>
          <button onClick={() => { setEditProduct(null); setForm({ name: '', category: 'tshirts', price: '', description: '' }); setShowForm(true) }}
            className="flex items-center gap-2 bg-charcoal text-cream px-5 py-2.5 text-xs tracking-widest uppercase font-sans font-medium hover:bg-charcoal-800 transition-colors">
            <Plus size={14} /> Add Product
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full md:w-80 pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded text-sm font-sans text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-sand transition-colors" />
        </div>

        {/* Products table */}
        <div className="bg-white rounded border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] tracking-widest uppercase font-sans font-medium text-charcoal/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover bg-cream-200 rounded flex-shrink-0" />
                        <div>
                          <p className="text-sm font-sans font-medium text-charcoal">{p.name}</p>
                          {p.badge && <span className="text-[10px] bg-sand/10 text-sand px-2 py-0.5 rounded font-sans">{p.badge}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-sans capitalize text-charcoal/60 bg-gray-100 px-2.5 py-1 rounded">{p.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-sans font-medium text-charcoal">${p.price}</p>
                        {p.originalPrice && <p className="text-xs text-charcoal/40 line-through font-sans">${p.originalPrice}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-sans font-medium px-2 py-1 rounded-full ${p.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-sand text-sand" />
                        <span className="text-sm font-sans text-charcoal">{p.rating}</span>
                        <span className="text-xs text-charcoal/30 font-sans">({p.reviews})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(p)}
                          className="w-8 h-8 flex items-center justify-center text-charcoal/50 hover:text-charcoal hover:bg-gray-100 rounded transition-all">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => setDeleteConfirm(p.id)}
                          className="w-8 h-8 flex items-center justify-center text-charcoal/50 hover:text-red-500 hover:bg-red-50 rounded transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-lg p-8 animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-sans font-semibold text-charcoal text-lg">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setShowForm(false)} className="text-charcoal/40 hover:text-charcoal"><X size={18} /></button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-2">Product Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-sand transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-2">Category</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-sand bg-white">
                      <option value="hoodies">Hoodies</option>
                      <option value="jackets">Jackets</option>
                      <option value="tshirts">T-Shirts</option>
                      <option value="pants">Pants</option>
                      <option value="dresses">Dresses</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-2">Price ($)</label>
                    <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                      className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-sand transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-2">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-sand transition-colors resize-none" />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={handleSave}
                  className="flex-1 bg-charcoal text-cream py-3 text-xs tracking-widest uppercase font-sans font-medium hover:bg-charcoal-800 transition-colors flex items-center justify-center gap-2">
                  <Check size={14} /> {editProduct ? 'Save Changes' : 'Add Product'}
                </button>
                <button onClick={() => setShowForm(false)}
                  className="flex-1 border border-charcoal/20 py-3 text-xs tracking-widest uppercase font-sans font-medium text-charcoal hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete confirm */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full animate-scale-in text-center">
              <div className="w-12 h-12 bg-red-50 flex items-center justify-center mx-auto mb-4 rounded-full">
                <Trash2 size={20} className="text-red-500" />
              </div>
              <h3 className="font-sans font-semibold text-charcoal mb-2">Delete Product</h3>
              <p className="text-sm text-charcoal/50 font-sans mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 bg-red-500 text-white py-2.5 text-xs tracking-widest uppercase font-sans font-medium hover:bg-red-600 transition-colors">
                  Delete
                </button>
                <button onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border border-charcoal/20 py-2.5 text-xs tracking-widest uppercase font-sans font-medium text-charcoal hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
