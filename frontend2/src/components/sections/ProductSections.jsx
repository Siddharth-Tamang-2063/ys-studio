import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PRODUCTS } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import SectionHeader from '../ui/SectionHeader'

export function BestSellers() {
  const products = PRODUCTS.filter(p => p.badge === 'Best Seller' || p.isFeatured).slice(0, 4)

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex items-end justify-between mb-12">
        <SectionHeader overline="Customer Favorites" title="Best Sellers" centered={false} />
        <Link to="/collection?filter=bestseller"
          className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase font-sans font-medium text-charcoal/60 hover:text-sand transition-colors group">
          View All
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link to="/collection?filter=bestseller" className="btn-outline inline-flex items-center gap-2">
          View All Best Sellers <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}

export function TrendingProducts() {
  const [activeTab, setActiveTab] = useState('trending')
  const tabs = [
    { id: 'trending', label: 'Trending' },
    { id: 'new', label: 'New In' },
    { id: 'sale', label: 'On Sale' },
  ]

  const getProducts = () => {
    if (activeTab === 'trending') return PRODUCTS.filter(p => p.isTrending).slice(0, 4)
    if (activeTab === 'new') return PRODUCTS.filter(p => p.badge === 'New Arrival').slice(0, 4)
    if (activeTab === 'sale') return PRODUCTS.filter(p => p.originalPrice).slice(0, 4)
    return PRODUCTS.slice(0, 4)
  }

  return (
    <section className="py-20 bg-cream-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <SectionHeader overline="What's Hot Right Now" title="Trending Now" centered={false} />

          <div className="flex items-center gap-1 border border-charcoal/10 p-1 self-start md:self-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-200 ${activeTab === tab.id ? 'bg-charcoal text-cream' : 'text-charcoal/60 hover:text-charcoal'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {getProducts().map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="text-center mt-12">
          <Link to="/collection" className="btn-outline inline-flex items-center gap-2">
            Browse All Products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}