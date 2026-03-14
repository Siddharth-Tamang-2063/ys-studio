import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const BADGE_STYLES = {
  'Best Seller':  'bg-[#1a1a1a] text-white',
  'New Arrival':  'bg-orange-500 text-white',
  'Sale':         'bg-red-500 text-white',
  'Trending':     'bg-[#1a1a1a]/80 text-white',
  'Thrift Pick':  'border border-orange-400/50 text-orange-500',
  'Limited':      'bg-orange-500 text-white',
  'Premium':      'bg-[#1a1a1a] text-white',
}

function optimizeUrl(src, width = 600) {
  if (!src || src.includes('auto=format')) return src
  return `${src.split('?')[0]}?w=${width}&q=75&auto=format&fit=crop`
}

const FALLBACK = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=70&auto=format&fit=crop'

export default function ProductCard({ product, layout = 'grid' }) {
  if (!product) return null

  const [hovered,     setHovered]     = useState(false)
  const [wishlist,    setWishlist]    = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()
  const navigate    = useNavigate()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const sizes = product.sizes || []
    addItem(product, sizes[2] || sizes[0] || 'M')
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1800)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const img1 = optimizeUrl(product.images?.[0])
  const img2 = optimizeUrl(product.images?.[1])

  // ── List layout ──────────────────────────────────────────────
  if (layout === 'list') {
    return (
      <Link
        to={`/product/${product.slug}`}
        className="flex gap-4 p-4 bg-white border border-[#1a1a1a]/6 hover:border-[#1a1a1a]/16 hover:shadow-sm transition-all duration-300 group"
        style={{ fontFamily: '"Outfit", sans-serif' }}
      >
        {/* Image */}
        <div className="w-24 h-32 flex-shrink-0 overflow-hidden bg-[#f5f0e8] relative">
          <img
            src={img1}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.src = FALLBACK }}
          />
          {product.badge && (
            <span className={`absolute top-1.5 left-1.5 text-[8px] tracking-widest uppercase font-medium px-1.5 py-0.5 ${BADGE_STYLES[product.badge] || 'bg-[#1a1a1a] text-white'}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
          <div>
            <p className="text-[9px] tracking-widest uppercase text-orange-500 mb-1">{product.category}</p>
            <h3 className="text-base font-medium text-[#1a1a1a] leading-snug mb-1.5 truncate"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem' }}>
              {product.name}
            </h3>
            <p className="text-xs text-[#1a1a1a]/40 line-clamp-2 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center justify-between mt-3">
            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-[#1a1a1a]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#1a1a1a]/30 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount && (
                <span className="text-[9px] font-semibold text-red-500">-{discount}%</span>
              )}
            </div>

            {/* Sizes */}
            <div className="flex gap-1">
              {(product.sizes || []).slice(0, 4).map(s => (
                <span key={s} className="text-[9px] border border-[#1a1a1a]/12 px-1.5 py-0.5 text-[#1a1a1a]/40">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // ── Grid layout ──────────────────────────────────────────────
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ fontFamily: '"Outfit", sans-serif' }}
    >
      <Link to={`/product/${product.slug}`} className="block group">

        {/* Image shell */}
        <div className="relative overflow-hidden bg-[#ede8df]" style={{ paddingBottom: '130%' }}>

          {/* Primary image */}
          <img
            src={img1}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onError={e => { e.target.src = FALLBACK }}
          />

          {/* Secondary image */}
          {img2 && (
            <img
              src={img2}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'scale(1.06)' : 'scale(1.03)',
                transition: 'opacity 0.5s ease, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              onError={e => { if (e.target.src !== FALLBACK) e.target.src = FALLBACK }}
            />
          )}

          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-2.5 left-2.5 text-[9px] tracking-widest uppercase font-medium px-2 py-0.5 z-10 ${BADGE_STYLES[product.badge] || 'bg-[#1a1a1a] text-white'}`}
              style={{
                opacity: hovered ? 0 : 1,
                transition: 'opacity 0.25s ease',
              }}
            >
              {product.badge}
            </span>
          )}

          {/* Discount */}
          {discount && (
            <span className="absolute top-2.5 right-2.5 bg-red-500 text-white text-[9px] font-semibold px-1.5 py-0.5 z-10">
              -{discount}%
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); setWishlist(!wishlist) }}
            className="absolute z-20 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
            style={{
              top: discount ? '42px' : '10px',
              right: '10px',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <Heart
              size={13}
              className={wishlist ? 'fill-red-500 text-red-500' : 'text-[#1a1a1a]/50'}
            />
          </button>

          {/* Add to Cart bar */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20"
            style={{
              transform: hovered ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-3 text-[10px] tracking-widest uppercase font-semibold transition-colors duration-300"
              style={{
                background: addedToCart ? '#2e7d52' : '#1a1a1a',
                color: '#fff',
              }}
            >
              <ShoppingBag
                size={12}
                style={{
                  transform: addedToCart ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              />
              {addedToCart ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="pt-3 pb-1">
          <p className="text-[9px] tracking-widest uppercase text-orange-500 mb-1">{product.category}</p>

          <h3
            className="text-base leading-snug mb-2 font-light"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              color: hovered ? '#f97316' : '#1a1a1a',
              transition: 'color 0.25s ease',
              fontSize: '1.05rem',
            }}
          >
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-[#1a1a1a]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#1a1a1a]/30 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-orange-400 text-xs">★</span>
              <span className="text-xs text-[#1a1a1a]/40">{product.rating}</span>
            </div>
          </div>
        </div>

      </Link>
    </div>
  )
}