import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, Grid, List, X, ChevronDown, Search } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../components/ui/ProductCard'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

const PRICE_RANGES = [
  { label: 'Under Rs. 3,000', min: 0, max: 3000 },
  { label: 'Rs. 3,000 – 8,000', min: 3000, max: 8000 },
  { label: 'Rs. 8,000 – 15,000', min: 8000, max: 15000 },
  { label: 'Over Rs. 15,000', min: 15000, max: Infinity },
]

const HEADER_IMAGES = {
  sale: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80',
  new: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80',
  hoodies: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=80',
  jackets: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1400&q=80',
  tshirts: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1400&q=80',
  pants: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1400&q=80',
  dresses: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80',
  default: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=80',
}

function getPageTitle(filterParam, category) {
  if (filterParam === 'sale') return 'Sale'
  if (filterParam === 'new') return 'New Arrivals'
  if (filterParam === 'bestseller') return 'Best Sellers'
  if (category !== 'all') return CATEGORIES.find(c => c.id === category)?.name || 'Collection'
  return 'All Products'
}

function getPageOverline(filterParam) {
  if (filterParam === 'sale') return 'Up to 40% Off'
  if (filterParam === 'new') return 'Fresh Drops'
  if (filterParam === 'bestseller') return 'Customer Favorites'
  return 'The Edit'
}

export default function Collection() {
  const [params] = useSearchParams()
  const initCategory = params.get('category') || 'all'
  const filterParam = params.get('filter')

  const [category, setCategory] = useState(initCategory)
  const [sort, setSort] = useState('featured')
  const [priceRange, setPriceRange] = useState(null)
  const [layout, setLayout] = useState('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [mounted, setMounted] = useState(false)
  const [navHeight, setNavHeight] = useState(100)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setCategory(params.get('category') || 'all') }, [params])

  useEffect(() => {
    const measure = () => {
      const el = document.getElementById('site-header')
      if (el) setNavHeight(el.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [filtersOpen])

  const products = useMemo(() => {
    let filtered = [...PRODUCTS]
    if (category !== 'all') filtered = filtered.filter(p => p.category === category)
    if (filterParam === 'sale') filtered = filtered.filter(p => p.originalPrice)
    if (filterParam === 'new') filtered = filtered.filter(p => p.badge === 'New Arrival')
    if (filterParam === 'bestseller') filtered = filtered.filter(p => p.isFeatured)
    if (priceRange) filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max)
    if (search.trim()) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    switch (sort) {
      case 'price-asc': return filtered.sort((a, b) => a.price - b.price)
      case 'price-desc': return filtered.sort((a, b) => b.price - a.price)
      case 'rating': return filtered.sort((a, b) => b.rating - a.rating)
      case 'newest': return filtered.sort((a, b) => b.id - a.id)
      default: return filtered
    }
  }, [category, sort, priceRange, filterParam, search])

  const activeFiltersCount = [category !== 'all', priceRange, search.trim()].filter(Boolean).length
  const headerImg = HEADER_IMAGES[filterParam] || HEADER_IMAGES[category] || HEADER_IMAGES.default
  const pageTitle = getPageTitle(filterParam, category)
  const pageOverline = getPageOverline(filterParam)
  const clearAll = () => { setCategory('all'); setPriceRange(null); setSearch('') }

  return (
    <div className="min-h-screen bg-cream">

      {/* Hero Banner */}
      <div className="relative h-44 sm:h-56 md:h-72 overflow-hidden">
        <img src={headerImg} alt={pageTitle} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-[10px] sm:text-xs tracking-ultra uppercase font-sans font-medium text-sand mb-2 sm:mb-3">{pageOverline}</p>
            <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-light text-cream leading-none">{pageTitle}</h1>
            <p className="mt-2 sm:mt-3 font-sans text-cream/50 text-xs sm:text-sm">{products.length} products</p>
          </div>
        </div>
      </div>

      {/* Sticky Category Bar */}
      <div style={{ top: navHeight }} className="sticky z-30 bg-cream/95 border-b border-charcoal/8 shadow-sm">
        {/* Mobile: flex-wrap (2 lines) | Desktop: single row no-wrap */}
        <div className="flex flex-wrap md:flex-nowrap gap-1.5 px-4 py-2 md:overflow-x-auto md:no-scrollbar">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              className={`px-3 py-1.5 text-[10px] md:text-xs tracking-widest uppercase font-sans font-medium whitespace-nowrap transition-all duration-200 md:flex-shrink-0
                ${category === cat.id
                  ? 'bg-charcoal text-cream'
                  : 'text-charcoal/50 border border-charcoal/10'
                }`}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-5 sm:mb-8">

          {/* Desktop search */}
          <div className="relative flex-1 max-w-xs hidden md:block">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="w-full pl-8 pr-4 py-2 border border-charcoal/15 bg-transparent text-sm font-sans text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-sand transition-colors" />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal">
                <X size={12} />
              </button>
            )}
          </div>

          <div className="flex-1 md:flex-none" />

          {/* Active filter pills — desktop */}
          {activeFiltersCount > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              {priceRange && (
                <span className="flex items-center gap-1.5 bg-sand/10 text-sand text-xs font-sans px-3 py-1.5 border border-sand/20">
                  {priceRange.label}
                  <button onClick={() => setPriceRange(null)}><X size={10} /></button>
                </span>
              )}
              <button onClick={clearAll} className="text-xs font-sans text-red-400 hover:text-red-500 transition-colors flex items-center gap-1 underline underline-offset-2">
                <X size={11} /> Clear all
              </button>
            </div>
          )}

          {/* Mobile filter button */}
          <button onClick={() => setFiltersOpen(true)}
            className="md:hidden flex items-center gap-1.5 border border-charcoal/20 px-3 py-2 text-[10px] tracking-widest uppercase font-sans font-medium text-charcoal hover:border-charcoal transition-all">
            <SlidersHorizontal size={12} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-sand text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] leading-none">{activeFiltersCount}</span>
            )}
          </button>

          {/* Sort */}
          <div className="relative">
            <button onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1.5 sm:gap-2 border border-charcoal/20 px-3 sm:px-4 py-2 text-[10px] sm:text-xs tracking-widest uppercase font-sans font-medium text-charcoal hover:border-charcoal hover:bg-cream-200 transition-all">
              <span className="hidden sm:inline">{SORT_OPTIONS.find(s => s.value === sort)?.label}</span>
              <span className="sm:hidden">Sort</span>
              <ChevronDown size={10} className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 top-full mt-1 bg-cream shadow-luxury-lg z-20 w-48 sm:w-52 border border-charcoal/5">
                  {SORT_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => { setSort(opt.value); setSortOpen(false) }}
                      className={`w-full text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs tracking-widest uppercase font-sans transition-colors flex items-center justify-between
                        ${sort === opt.value ? 'bg-charcoal text-cream' : 'text-charcoal hover:bg-cream-200'}`}>
                      {opt.label}
                      {sort === opt.value && <span className="text-sand">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Grid/List toggle — desktop only */}
          <div className="hidden md:flex border border-charcoal/15 overflow-hidden">
            <button onClick={() => setLayout('grid')}
              className={`p-2.5 transition-colors duration-150 ${layout === 'grid' ? 'bg-charcoal text-cream' : 'text-charcoal/40 hover:text-charcoal hover:bg-cream-200'}`}>
              <Grid size={14} />
            </button>
            <button onClick={() => setLayout('list')}
              className={`p-2.5 transition-colors duration-150 border-l border-charcoal/10 ${layout === 'list' ? 'bg-charcoal text-cream' : 'text-charcoal/40 hover:text-charcoal hover:bg-cream-200'}`}>
              <List size={14} />
            </button>
          </div>
        </div>

        {/* Active filter pills — mobile row */}
        {activeFiltersCount > 0 && (
          <div className="sm:hidden flex items-center gap-2 mb-4 flex-wrap">
            {priceRange && (
              <span className="flex items-center gap-1.5 bg-sand/10 text-sand text-xs font-sans px-3 py-1.5 border border-sand/20">
                {priceRange.label}
                <button onClick={() => setPriceRange(null)}><X size={10} /></button>
              </span>
            )}
            <button onClick={clearAll} className="text-xs font-sans text-red-400 flex items-center gap-1 underline underline-offset-2">
              <X size={11} /> Clear all
            </button>
          </div>
        )}

        <div className="flex gap-8 lg:gap-10">

          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-48 lg:w-52 flex-shrink-0">
            <div style={{ top: navHeight + 56 }} className="sticky space-y-8">
              <div>
                <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-4">Search</p>
                <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                    className="w-full pl-7 pr-3 py-2 border border-charcoal/15 bg-transparent text-xs font-sans text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-sand transition-colors" />
                </div>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-4">Category</p>
                <div className="space-y-0.5">
                  {CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => setCategory(cat.id)}
                      className={`w-full text-left flex items-center justify-between py-2 text-sm font-sans transition-all duration-150 group
                        ${category === cat.id ? 'text-charcoal font-medium' : 'text-charcoal/45 hover:text-charcoal'}`}>
                      <span className="flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full bg-sand transition-opacity ${category === cat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                        {cat.name}
                      </span>
                      <span className="text-xs text-charcoal/30 font-sans">
                        {PRODUCTS.filter(p => cat.id === 'all' || p.category === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-4">Price</p>
                <div className="space-y-0.5">
                  {PRICE_RANGES.map((range, i) => (
                    <button key={i} onClick={() => setPriceRange(priceRange?.label === range.label ? null : range)}
                      className={`w-full text-left flex items-center gap-2 py-2 text-sm font-sans transition-all duration-150 group
                        ${priceRange?.label === range.label ? 'text-charcoal font-medium' : 'text-charcoal/45 hover:text-charcoal'}`}>
                      <span className={`w-3 h-3 border flex items-center justify-center flex-shrink-0 transition-all
                        ${priceRange?.label === range.label ? 'border-charcoal bg-charcoal' : 'border-charcoal/25 group-hover:border-charcoal/60'}`}>
                        {priceRange?.label === range.label && <span className="w-1.5 h-1.5 bg-cream block" />}
                      </span>
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
              {activeFiltersCount > 0 && (
                <button onClick={clearAll} className="flex items-center gap-1.5 text-xs font-sans text-red-400 hover:text-red-600 transition-colors">
                  <X size={11} /> Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {filtersOpen && (
            <>
              <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setFiltersOpen(false)} />
              <div className="fixed bottom-0 left-0 right-0 bg-cream z-50 rounded-t-2xl md:hidden max-h-[85vh] flex flex-col">
                {/* Sticky header */}
                <div className="flex-shrink-0 pt-4 pb-3 px-6 border-b border-charcoal/5">
                  <div className="w-10 h-1 bg-charcoal/20 rounded-full mx-auto mb-4" />
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-light">Filters</h3>
                    <button onClick={() => setFiltersOpen(false)} className="p-1.5 text-charcoal/40 hover:text-charcoal"><X size={18} /></button>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                  {/* Search */}
                  <div>
                    <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-3">Search</p>
                    <div className="relative">
                      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
                      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
                        className="w-full pl-9 pr-4 py-2.5 border border-charcoal/15 bg-transparent text-sm font-sans text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-sand transition-colors" />
                      {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30"><X size={12} /></button>}
                    </div>
                  </div>
                  {/* Category */}
                  <div>
                    <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-3">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map(cat => (
                        <button key={cat.id} onClick={() => setCategory(cat.id)}
                          className={`px-4 py-2 text-xs tracking-wider uppercase font-sans border transition-all
                            ${category === cat.id ? 'bg-charcoal text-cream border-charcoal' : 'border-charcoal/15 text-charcoal/70 hover:border-charcoal'}`}>
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Price */}
                  <div>
                    <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-3">Price Range</p>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_RANGES.map((range, i) => (
                        <button key={i} onClick={() => setPriceRange(priceRange?.label === range.label ? null : range)}
                          className={`px-4 py-2 text-xs font-sans border transition-all
                            ${priceRange?.label === range.label ? 'bg-charcoal text-cream border-charcoal' : 'border-charcoal/15 text-charcoal/70 hover:border-charcoal'}`}>
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sticky footer */}
                <div className="flex-shrink-0 border-t border-charcoal/5 px-6 py-4 flex gap-3">
                  {activeFiltersCount > 0 && (
                    <button onClick={clearAll} className="flex-1 border border-charcoal/20 py-3 text-xs tracking-widest uppercase font-sans font-medium text-charcoal hover:bg-cream-200 transition-colors">
                      Clear All
                    </button>
                  )}
                  <button onClick={() => setFiltersOpen(false)} className="flex-1 bg-charcoal text-cream py-3 text-xs tracking-widest uppercase font-sans font-medium hover:bg-charcoal-800 transition-colors">
                    Show {products.length} Results
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Products */}
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="text-center py-20 sm:py-32">
                <div className="w-14 h-14 sm:w-16 sm:h-16 border border-charcoal/10 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                  <Search size={22} className="text-charcoal/20" />
                </div>
                <p className="font-display text-2xl sm:text-3xl font-light text-charcoal/30 mb-2">No products found</p>
                <p className="text-xs sm:text-sm text-charcoal/40 font-sans mb-6 sm:mb-8">Try adjusting your filters or search terms</p>
                <button onClick={clearAll} className="btn-outline">Clear All Filters</button>
              </div>
            ) : (
              <>
                <p className="text-xs font-sans text-charcoal/40 mb-4 sm:mb-6">
                  Showing <span className="text-charcoal font-medium">{products.length}</span> products
                  {search && <> for "<span className="text-sand">{search}</span>"</>}
                </p>
                {layout === 'list' ? (
                  <div className="space-y-3">
                    {products.map(p => <ProductCard key={p.id} product={p} layout="list" />)}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 md:gap-x-6 md:gap-y-10">
                    {products.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}