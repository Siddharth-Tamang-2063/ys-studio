import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { COLLECTIONS } from '../../data/products'

// ─── Marquee ────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  'Cash on Delivery Available', '✦', 'New Drops 2025', '✦',
  'Delivery All Over Nepal', '✦', 'Easy Size Exchange', '✦',
  'Streetwear & Thrift Finds', '✦', 'New Thrift Every Week', '✦',
  'Cash on Delivery Available', '✦', 'New Drops 2025', '✦',
  'Delivery All Over Nepal', '✦', 'Easy Size Exchange', '✦',
  'Streetwear & Thrift Finds', '✦', 'New Thrift Every Week', '✦',
]

export function Marquee() {
  return (
    <div className="bg-[#111] overflow-hidden py-3.5">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="flex whitespace-nowrap marquee-track">
        {MARQUEE_ITEMS.map((item, i) => (
          <span
            key={i}
            className="mx-5 text-xs tracking-widest uppercase font-medium"
            style={{
              fontFamily: '"Outfit", sans-serif',
              color: item === '✦' ? 'rgba(251,146,60,0.6)' : 'rgba(255,255,255,0.35)',
              fontSize: item === '✦' ? '8px' : undefined,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Shared card shell ───────────────────────────────────────
function CategoryCard({ to, image, tag, tagGold, count, name, large }) {
  return (
    <Link to={to} className="group relative overflow-hidden block w-full h-full">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80'
        }}
      />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

      {/* Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
        <span
          className="text-[9px] sm:text-[10px] tracking-widest uppercase font-medium px-2 py-0.5 sm:px-2.5 sm:py-1"
          style={{
            fontFamily: '"Outfit", sans-serif',
            background: tagGold ? '#fb923c' : 'rgba(255,255,255,0.1)',
            color: tagGold ? '#000' : 'rgba(255,255,255,0.7)',
            border: tagGold ? 'none' : '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {tag}
        </span>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
        <p
          className="text-[10px] sm:text-xs tracking-widest uppercase mb-1"
          style={{ fontFamily: '"Outfit", sans-serif', color: 'rgba(255,255,255,0.35)' }}
        >
          {count}
        </p>
        <div className="flex items-end justify-between gap-2">
          <h3
            className={`font-light text-white leading-none ${large ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl md:text-3xl'}`}
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            {name}
          </h3>
          <div className="w-7 h-7 sm:w-8 sm:h-8 border border-white/20 group-hover:border-orange-400 group-hover:bg-orange-400 flex items-center justify-center transition-all duration-300 flex-shrink-0">
            <ArrowUpRight size={12} className="text-white/50 group-hover:text-black transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Category Cards Section ──────────────────────────────────
export function CategoryCards() {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12 md:mb-16">
          <div>
            <p
              className="text-[10px] tracking-[0.5em] uppercase font-medium text-orange-400 mb-2 sm:mb-3"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              ✦ Shop by Category
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Find Your Style
            </h2>
          </div>
          <Link
            to="/collection"
            className="hidden sm:flex items-center gap-2 text-[10px] tracking-widest uppercase font-medium text-white/30 hover:text-orange-400 transition-colors group"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            View All
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── MOBILE: 2-col grid ── */}
        <div className="grid grid-cols-2 gap-2.5 md:hidden">
          {[
            {
              to: '/collection?category=hoodies',
              image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?q=80&w=687&auto=format&fit=crop',
              tag: 'Cozy Essentials', count: '24 styles', name: 'Hoodies',
            },
            {
              to: '/collection?category=jackets',
              image: 'https://images.unsplash.com/photo-1706765779494-2705542ebe74?w=600&auto=format&fit=crop&q=60',
              tag: 'Outerwear', count: '18 styles', name: 'Jackets',
            },
            {
              to: '/collection?category=tshirts',
              image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80',
              tag: 'The Basics', count: '36 styles', name: 'T-Shirts',
            },
            {
              to: '/collection?category=cargo',
              image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
              tag: 'Street Fit', count: '15 styles', name: 'Cargo',
            },
            {
              to: '/collection?collection=thrift-archive',
              image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80',
              tag: 'Vintage Finds', tagGold: true, count: 'One of a Kind', name: 'Thrift',
            },
            {
              to: '/collection?filter=sale',
              image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
              tag: 'Up to 40% Off', tagGold: true, count: 'Limited Time', name: 'Sale',
            },
          ].map(c => (
            <div key={c.name} className="aspect-[3/4] relative">
              <CategoryCard {...c} />
            </div>
          ))}
        </div>

        {/* ── DESKTOP: bento grid ── */}
        <div className="hidden md:grid grid-cols-12 gap-4" style={{ gridTemplateRows: '320px 260px' }}>

          {/* Hoodies — tall left (2 rows) */}
          <div className="col-span-3 row-span-2 relative">
            <CategoryCard
              to="/collection?category=hoodies"
              image="https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?q=80&w=687&auto=format&fit=crop"
              tag="Cozy Essentials" count="24 styles" name="Hoodies" large
            />
          </div>

          {/* Jackets — wide top center */}
          <div className="col-span-6 relative">
            <CategoryCard
              to="/collection?category=jackets"
              image="https://images.unsplash.com/photo-1706765779494-2705542ebe74?w=800&auto=format&fit=crop&q=80"
              tag="Outerwear" count="18 styles" name="Jackets" large
            />
          </div>

          {/* Thrift — tall right (2 rows) */}
          <div className="col-span-3 row-span-2 relative">
            <CategoryCard
              to="/collection?collection=thrift-archive"
              image="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=85"
              tag="Vintage Finds" tagGold count="One of a Kind" name="Thrift" large
            />
          </div>

          {/* T-Shirts — bottom center left */}
          <div className="col-span-3 relative">
            <CategoryCard
              to="/collection?category=tshirts"
              image="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=85"
              tag="The Basics" count="36 styles" name="T-Shirts"
            />
          </div>

          {/* Cargo — bottom center right */}
          <div className="col-span-3 relative">
            <CategoryCard
              to="/collection?category=cargo"
              image="https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=85"
              tag="Street Fit" count="15 styles" name="Cargo"
            />
          </div>

        </div>

        {/* Mobile view-all */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 border border-white/10 text-white/40 hover:border-orange-400 hover:text-orange-400 px-6 py-3 text-[10px] tracking-widest uppercase transition-all duration-200"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            Browse All <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  )
}

// ─── Featured Collections ────────────────────────────────────
export function FeaturedCollections() {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#080808] relative overflow-hidden">

      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 50%, #E8A02022 0%, transparent 60%), radial-gradient(circle at 85% 20%, #7C5CBF18 0%, transparent 55%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <p
              className="text-[10px] tracking-[0.5em] uppercase font-medium text-orange-400 mb-3 sm:mb-4"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              ✦ Drop Season
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Our Collections
            </h2>
          </div>
          <p
            className="font-light text-white/30 text-sm sm:text-base max-w-xs sm:text-right"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            New thrift finds and streetwear drops — landing every week.
          </p>
        </div>

        {/* Mobile stacked */}
        <div className="flex flex-col gap-3 md:hidden">
          {COLLECTIONS.map((col, i) => (
            <Link
              key={col.id}
              to={`/collection?collection=${col.slug}`}
              className="group relative overflow-hidden aspect-[16/9]"
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              {i === 0 && (
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[9px] tracking-widest uppercase border border-orange-400/50 text-orange-400 px-3 py-1.5"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    New Drop
                  </span>
                </div>
              )}
              {col.slug === 'thrift-archive' && (
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[9px] tracking-widest uppercase border border-purple-400/50 text-purple-400 px-3 py-1.5"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    Thrift Pick
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <p
                    className="text-[9px] tracking-widest uppercase text-orange-400/80 mb-1"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    {col.description}
                  </p>
                  <h3
                    className="text-2xl font-light text-white"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {col.name}
                  </h3>
                  <p
                    className="text-[10px] text-white/30 mt-0.5"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    {col.itemCount} Pieces
                  </p>
                </div>
                <div className="w-9 h-9 border border-white/15 group-hover:border-orange-400 group-hover:bg-orange-400 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                  <ArrowUpRight size={13} className="text-white/40 group-hover:text-black transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop feature + stacked */}
        <div className="hidden md:grid grid-cols-12 gap-4" style={{ minHeight: '540px' }}>
          <Link
            to={`/collection?collection=${COLLECTIONS[0].slug}`}
            className="col-span-7 group relative overflow-hidden"
          >
            <img
              src={COLLECTIONS[0].image}
              alt={COLLECTIONS[0].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            <div className="absolute top-5 left-5">
              <span
                className="text-[9px] tracking-widest uppercase border border-orange-400/60 text-orange-400 px-3 py-1.5"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                ✦ New Drop
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p
                className="text-[9px] tracking-widest uppercase text-orange-400 mb-3"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                {COLLECTIONS[0].description}
              </p>
              <h3
                className="text-4xl lg:text-5xl font-light text-white mb-5 leading-tight"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic' }}
              >
                {COLLECTIONS[0].name}
              </h3>
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] tracking-widest uppercase text-white/30"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {COLLECTIONS[0].itemCount} Pieces
                </span>
                <div
                  className="flex items-center gap-2 text-white/40 group-hover:text-orange-400 transition-colors duration-300"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  <span className="text-[10px] tracking-widest uppercase">Explore</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </Link>

          <div className="col-span-5 flex flex-col gap-4">
            {COLLECTIONS.slice(1).map((col, i) => (
              <Link
                key={col.id}
                to={`/collection?collection=${col.slug}`}
                className="flex-1 group relative overflow-hidden"
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                {i === 0 && (
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[9px] tracking-widest uppercase border border-purple-400/50 text-purple-400 px-3 py-1.5"
                      style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                      Vintage
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p
                    className="text-[9px] tracking-widest uppercase text-orange-400/70 mb-2"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    {col.description}
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3
                        className="text-2xl lg:text-3xl font-light text-white mb-1"
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                      >
                        {col.name}
                      </h3>
                      <p
                        className="text-[10px] tracking-widest uppercase text-white/25"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                      >
                        {col.itemCount} Pieces
                      </p>
                    </div>
                    <div className="w-9 h-9 border border-white/10 group-hover:border-orange-400 group-hover:bg-orange-400 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <ArrowUpRight size={13} className="text-white/40 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-10 border-t border-white/5 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-sm text-white/20 text-center sm:text-left"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            New thrift drops every week — follow us on Instagram to stay updated.
          </p>
          <Link
            to="/collection"
            className="group flex items-center gap-2 border border-white/10 text-white/40 hover:border-orange-400 hover:text-orange-400 px-6 py-3 text-[10px] tracking-widest uppercase font-medium transition-all duration-200 whitespace-nowrap"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            View All Collections
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  )
}