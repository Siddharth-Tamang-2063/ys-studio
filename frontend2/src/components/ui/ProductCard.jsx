import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, Eye } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const BADGE_COLORS = {
  'Best Seller': 'bg-[#111] text-white',
  'New Arrival': 'bg-orange-400 text-black',
  'Sale': 'bg-red-500 text-white',
  'Limited': 'bg-purple-500 text-white',
  'Luxury': 'bg-orange-400 text-black',
  'Premium': 'bg-orange-400 text-black',
  'Trending': 'bg-white/10 text-white border border-white/20',
  'Thrift Pick': 'bg-purple-500/20 text-purple-300 border border-purple-400/40',
}

// ✅ Optimized image URL — forces WebP + correct size
function optimizeUrl(src, width = 600) {
  if (!src || src.includes('auto=format')) return src
  const base = src.split('?')[0]
  return `${base}?w=${width}&q=70&auto=format&fit=crop`
}

// ✅ Fallback image
const FALLBACK = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=70&auto=format&fit=crop'

export default function ProductCard({ product, layout = 'grid' }) {
  if (!product) return null
  const [hovered, setHovered] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const sizes = product.sizes || []
    addItem(product, sizes[2] || sizes[0] || 'M')
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1800)
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/product/${product.slug}`)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  // ✅ Optimized URLs
  const img1 = optimizeUrl(product.images?.[0])
  const img2 = optimizeUrl(product.images?.[1])

  // ── List layout ──────────────────────────────────────────────
  if (layout === 'list') {
    return (
      <Link
        to={`/product/${product.slug}`}
        className="flex gap-4 p-4 bg-[#111] border border-white/5 hover:border-white/10 transition-all duration-300 group"
      >
        <div className="w-28 h-36 flex-shrink-0 overflow-hidden bg-white/5 relative">
          <img
            src={img1}
            alt={product.name}
            loading="lazy"                      // ✅ lazy load
            crossOrigin="anonymous"             // ✅ fixes CORB
            decoding="async"                    // ✅ non-blocking decode
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = FALLBACK }}
          />
        </div>
        <div className="flex flex-col justify-between py-1 flex-1">
          <div>
            <p
              className="text-[10px] tracking-widest uppercase font-medium text-orange-400 mb-1"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              {product.category}
            </p>
            <h3
              className="text-xl font-light text-white leading-tight mb-2"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {product.name}
            </h3>
            <p
              className="text-sm text-white/40 line-clamp-2"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span
                className="text-lg font-medium text-white"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span
                  className="text-sm text-white/30 line-through"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex gap-1">
              {(product.sizes || []).slice(0, 4).map(s => (
                <span
                  key={s}
                  className="text-xs border border-white/15 px-2 py-0.5 text-white/40"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
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
    >
      <Link to={`/product/${product.slug}`} className="block">

        {/* Image Shell */}
        <div
          className="relative overflow-hidden bg-white/5"
          style={{ paddingBottom: '133.33%' }}
        >
          {/* ✅ Primary image — lazy + CORB fix */}
          <img
            src={img1}
            alt={product.name}
            loading="lazy"
            crossOrigin="anonymous"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onError={(e) => { e.target.src = FALLBACK }}
          />

          {/* ✅ Secondary image — only renders in DOM when img2 exists */}
          {img2 && (
            <img
              src={img2}
              alt={product.name}
              loading="lazy"
              crossOrigin="anonymous"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'scale(1.07)' : 'scale(1.03)',
                transition: 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
             onError={(e) => { if (e.target.src !== FALLBACK) e.target.src = FALLBACK }}
            />
          )}

          {/* Dark scrim */}
          <div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{
              opacity: hovered ? 0.2 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 z-10 ${BADGE_COLORS[product.badge] || 'bg-[#111] text-white'}`}
              style={{
                fontFamily: '"Outfit", sans-serif',
                opacity: hovered ? 0 : 1,
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              {product.badge}
            </span>
          )}

          {/* Discount % */}
          {discount && (
            <span
              className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-medium px-2 py-1 z-10"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              -{discount}%
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlist(!wishlist) }}
            className="absolute w-9 h-9 bg-[#111] flex items-center justify-center z-20"
            style={{
              top: discount ? '46px' : '12px',
              right: '12px',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.85)',
              transition: 'opacity 0.3s ease 0.05s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s',
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}
          >
            <Heart
              size={14}
              className={wishlist ? 'fill-red-400 text-red-400' : 'text-white/60'}
              style={{ transition: 'color 0.2s ease, fill 0.2s ease' }}
            />
          </button>

          {/* Quick View — button not Link */}
          <div
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            style={{
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease 0.1s',
            }}
          >
            <button
              onClick={handleQuickView}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs tracking-widest uppercase font-medium text-black pointer-events-auto"
              style={{
                fontFamily: '"Outfit", sans-serif',
                transform: hovered ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.95)',
                transition: 'transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1) 0.1s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <Eye size={13} />
              Quick View
            </button>
          </div>

          {/* Add to Cart bar */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20"
            style={{
              transform: hovered ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-[10px] tracking-widest uppercase font-medium"
              style={{
                fontFamily: '"Outfit", sans-serif',
                background: addedToCart ? '#2E7D52' : '#fb923c',
                color: addedToCart ? '#fff' : '#000',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
            >
              <ShoppingBag
                size={13}
                style={{
                  transform: addedToCart ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              />
              {addedToCart ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-3.5 pb-1">
          <p
            className="text-[10px] tracking-widest uppercase font-medium text-orange-400 mb-1"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            {product.category}
          </p>
          <h3
            className="text-lg md:text-xl font-light leading-tight mb-2"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              color: hovered ? '#fb923c' : '#ffffff',
              transition: 'color 0.3s ease',
            }}
          >
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span
                className="font-medium text-white"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span
                  className="text-sm text-white/30 line-through"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-orange-400 text-xs">★</span>
              <span
                className="text-xs text-white/40"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                {product.rating}
              </span>
            </div>
          </div>
        </div>

      </Link>
    </div>
  )
}