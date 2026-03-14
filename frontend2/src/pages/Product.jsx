import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, Check, Minus, Plus, ArrowLeft } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ui/ProductCard'
import StarRating from '../components/ui/StarRating'

const REVIEWS = [
  { id: 1, author: 'Rina S.', rating: 5, date: 'March 2025', text: 'Very good quality. The fabric is soft and comfortable. Delivered fast to Kathmandu. Will order again!' },
  { id: 2, author: 'Aman T.', rating: 5, date: 'February 2025', text: 'My second order from this store and both times the quality was great. Good packaging and fast delivery.' },
  { id: 3, author: 'Priya K.', rating: 4, date: 'February 2025', text: 'Nice product, size fits as expected. The color looks even better in person. Happy with the purchase.' },
]

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = PRODUCTS.find(p => p.slug === slug)
  const [selectedImg, setSelectedImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [qty, setQty] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const { addItem } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
    setSelectedImg(0); setSelectedSize(null); setSelectedColor(null); setQty(1); setAddedToCart(false)
  }, [slug])

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-3xl font-light text-charcoal/40 mb-6">Product not found</p>
        <Link to="/collection" className="btn-primary">Back to Collection</Link>
      </div>
    </div>
  )

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return }
    addItem(product, selectedSize, qty)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb — desktop */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="hidden md:flex items-center gap-2 text-xs font-sans text-charcoal/40">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-charcoal transition-colors">Collection</Link>
          <span>/</span>
          <Link to={`/collection?category=${product.category}`} className="hover:text-charcoal capitalize transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </div>

        {/* Back button — mobile only */}
        <button
          onClick={() => navigate(-1)}
          className="md:hidden flex items-center gap-1.5 text-xs tracking-widest uppercase font-sans font-medium text-charcoal/60 hover:text-charcoal transition-colors py-1"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-2 w-20 flex-shrink-0">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImg(i)}
                  className={`aspect-[3/4] overflow-hidden border-2 transition-all duration-200 ${selectedImg === i ? 'border-charcoal' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative group">
              <div className="aspect-[3/4] overflow-hidden bg-cream-200">
                <img
                  src={product.images[selectedImg]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Mobile navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setSelectedImg(i => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 flex items-center justify-center md:hidden">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setSelectedImg(i => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 flex items-center justify-center md:hidden">
                    <ChevronRight size={16} />
                  </button>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 md:hidden">
                    {product.images.map((_, i) => (
                      <button key={i} onClick={() => setSelectedImg(i)}
                        className={`h-1 transition-all duration-200 ${i === selectedImg ? 'w-5 bg-charcoal' : 'w-1 bg-charcoal/30 rounded-full'}`} />
                    ))}
                  </div>
                </>
              )}

              {product.badge && (
                <span className="absolute top-3 left-3 bg-charcoal text-cream text-xs tracking-widest uppercase font-sans px-3 py-1.5">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pt-4">
            {/* Category + rating row */}
            <div className="flex items-center justify-between mb-3">
              <Link to={`/collection?category=${product.category}`}
                className="text-xs tracking-widest uppercase font-sans text-sand hover:text-sand-dark transition-colors capitalize">
                {product.category}
              </Link>
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-charcoal leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-sans text-2xl font-medium text-charcoal">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="font-sans text-lg text-charcoal/40 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-sans text-red-500 font-medium">Save {discount}%</span>
                </>
              )}
            </div>

            {/* Color selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal">Color</p>
                {selectedColor && <p className="text-sm font-sans text-charcoal/60">{selectedColor}</p>}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.colors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs font-sans border transition-all duration-200 ${selectedColor === color ? 'border-charcoal bg-charcoal/5 font-medium text-charcoal' : 'border-charcoal/20 text-charcoal/60 hover:border-charcoal hover:text-charcoal'}`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className={`text-xs tracking-widest uppercase font-sans font-medium ${sizeError ? 'text-red-500' : 'text-charcoal'}`}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <button className="text-xs text-sand underline underline-offset-2 font-sans">Size Guide</button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-sm font-sans border transition-all duration-200 flex items-center justify-center ${selectedSize === size ? 'border-charcoal bg-charcoal text-cream' : 'border-charcoal/20 text-charcoal hover:border-charcoal'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center border border-charcoal/20">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-12 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-cream-200 transition-colors">
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-sans text-sm text-charcoal">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="w-11 h-12 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-cream-200 transition-colors">
                  <Plus size={14} />
                </button>
              </div>

              <button onClick={handleAddToCart}
                className={`flex-1 h-12 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-sans font-medium transition-all duration-300 ${addedToCart ? 'bg-sage text-white' : 'bg-charcoal text-cream hover:bg-charcoal-800'}`}>
                {addedToCart ? <><Check size={16} /> Added to Cart</> : <><ShoppingBag size={16} /> Add to Cart</>}
              </button>

              <button className="w-12 h-12 border border-charcoal/20 flex items-center justify-center text-charcoal/60 hover:text-red-400 hover:border-red-200 transition-all">
                <Heart size={16} />
              </button>
            </div>

            {/* View Cart link */}
            {addedToCart && (
              <div className="mb-6 animate-fade-up">
                <Link to="/cart" className="text-sm font-sans text-sand underline underline-offset-2 hover:text-sand-dark">
                  View Cart →
                </Link>
              </div>
            )}

            {/* Product meta tabs */}
            <div className="border-t border-charcoal/10 pt-6">
              <div className="flex gap-6 mb-6 border-b border-charcoal/10">
                {['description', 'details', 'reviews'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-xs tracking-widest uppercase font-sans font-medium capitalize border-b-2 -mb-px transition-colors ${activeTab === tab ? 'border-charcoal text-charcoal' : 'border-transparent text-charcoal/40 hover:text-charcoal'}`}>
                    {tab} {tab === 'reviews' && `(${REVIEWS.length})`}
                  </button>
                ))}
              </div>

              {activeTab === 'description' && (
                <p className="font-sans text-sm leading-relaxed text-charcoal/70 font-light">{product.description}</p>
              )}

              {activeTab === 'details' && (
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-sans text-charcoal/70">
                      <span className="w-1 h-1 bg-sand rounded-full mt-2 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-charcoal/5">
                    <div className="text-center">
                      <p className="font-display text-5xl font-light text-charcoal">{product.rating}</p>
                      <StarRating rating={product.rating} showCount={false} />
                      <p className="text-xs text-charcoal/50 font-sans mt-1">{product.reviews} reviews</p>
                    </div>
                  </div>
                  {REVIEWS.map(r => (
                    <div key={r.id} className="pb-5 border-b border-charcoal/5 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-sans font-medium text-sm text-charcoal">{r.author}</p>
                        <p className="text-xs text-charcoal/40 font-sans">{r.date}</p>
                      </div>
                      <StarRating rating={r.rating} showCount={false} size="sm" />
                      <p className="mt-2 text-sm font-sans text-charcoal/70 font-light leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-charcoal/10 grid grid-cols-3 gap-4">
              {[
                { icon: '🚚', label: 'Fast Delivery', sub: 'All over Nepal' },
                { icon: '🔄', label: 'Easy Exchange', sub: 'Hassle-free process' },
                { icon: '✓', label: 'COD Available', sub: 'Pay on delivery' },
              ].map(b => (
                <div key={b.label} className="text-center">
                  <div className="text-lg mb-1">{b.icon}</div>
                  <p className="text-xs tracking-wider uppercase font-sans font-medium text-charcoal">{b.label}</p>
                  <p className="text-xs font-sans text-charcoal/40 mt-0.5">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs tracking-ultra uppercase font-sans text-sand mb-2">You May Also Like</p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal">Related Products</h2>
              </div>
              <Link to={`/collection?category=${product.category}`}
                className="text-xs tracking-widest uppercase font-sans text-charcoal/50 hover:text-sand transition-colors hidden md:block">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}