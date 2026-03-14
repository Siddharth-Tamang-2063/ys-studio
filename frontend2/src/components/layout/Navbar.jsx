import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Search, X, Menu } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'
import logo from '../../assets/logo.jpeg'

const NAV_LINKS = [
  { label: 'Hoodies',  href: '/collection?category=hoodies' },
  { label: 'Tops',     href: '/collection?category=tshirts' },
  { label: 'Bottoms',  href: '/collection?category=cargo' },
  { label: 'Jackets',  href: '/collection?category=jackets' },
  { label: 'Thrift',   href: '/collection?category=thrift' },
  { label: 'Sale',     href: '/collection?filter=sale', accent: true },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [searchOpen,   setSearchOpen]   = useState(false)
  const [searchQuery,  setSearchQuery]  = useState('')
  const [searchResults,setSearchResults]= useState([])
  const { itemCount } = useCart()
  const location      = useLocation()
  const searchRef     = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setSearchOpen(false) }, [location.pathname])

  useEffect(() => {
    if (searchQuery.length > 1) {
      const q = searchQuery.toLowerCase()
      setSearchResults(
        PRODUCTS.filter(p =>
          p.name.toLowerCase().includes(q) || p.category.includes(q)
        ).slice(0, 5)
      )
    } else setSearchResults([])
  }, [searchQuery])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  return (
    <>
      <style>{`
        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-down { animation: fade-down 0.18s ease forwards; }
        @keyframes slide-right {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        .animate-slide-right { animation: slide-right 0.25s cubic-bezier(0.76,0,0.24,1) forwards; }
        @keyframes announcement-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .announcement-marquee {
          animation: announcement-scroll 20s linear infinite;
          width: max-content;
        }
      `}</style>

      <div className="sticky top-0 z-40" style={{ fontFamily: '"Outfit", sans-serif' }}>

        {/* Announcement bar — mobile only marquee */}
        <div className="bg-[#1a1a1a] text-white/50 py-2 px-4 text-[10px] tracking-widest uppercase overflow-hidden">
          <p className="hidden md:block text-center">
            Free Delivery · Cash on Delivery · Ships All Over Nepal · Easy Exchange
          </p>
          <div className="md:hidden overflow-hidden">
            <div className="flex whitespace-nowrap announcement-marquee">
              {[0, 1].map(i => (
                <span key={i} className="flex gap-6 pr-6">
                  <span>Free KTM Delivery</span>
                  <span className="opacity-30">·</span>
                  <span>Cash on Delivery</span>
                  <span className="opacity-30">·</span>
                  <span>Ships Nepal-Wide</span>
                  <span className="opacity-30">·</span>
                  <span>Easy Exchange</span>
                  <span className="opacity-30">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main header */}
        <header className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#f5f0e8]/95 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
            : 'bg-[#f5f0e8]'
        } border-b border-[#1a1a1a]/6`}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex items-center justify-between h-14 md:h-16">

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-1.5 -ml-1.5 text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu size={19} />
              </button>

              {/* Logo */}
              <Link
                to="/"
                className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center gap-2.5 flex-shrink-0"
              >
                <img src={logo} alt="YS Studio" className="h-7 md:h-8 w-auto object-contain rounded-sm" />
                <div className="flex flex-col leading-none">
                  <span className="text-sm md:text-base font-bold tracking-[0.08em] text-[#1a1a1a] uppercase">
                    YS Studio
                  </span>
                  <span className="text-[7px] tracking-[0.35em] uppercase text-[#1a1a1a]/35 hidden sm:block">
                    Luxury Streetwear
                  </span>
                </div>
              </Link>

              {/* Desktop nav links */}
              <nav className="hidden lg:flex items-center gap-8">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-[10px] tracking-widest uppercase font-medium transition-colors duration-150 ${
                      link.accent
                        ? 'text-orange-500 hover:text-orange-600'
                        : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Right icons */}
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors"
                >
                  {searchOpen ? <X size={17} /> : <Search size={17} />}
                </button>

                <Link
                  to="/cart"
                  className="relative p-2 text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors"
                >
                  <ShoppingBag size={17} />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-orange-500 text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </Link>
              </div>

            </div>
          </div>

          {/* Search dropdown */}
          {searchOpen && (
            <div className="border-t border-[#1a1a1a]/6 animate-fade-down">
              <div className="max-w-xl mx-auto px-5 py-4">
                <div className="relative">
                  <Search size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#1a1a1a]/25" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                    className="w-full pl-6 pb-2.5 pt-0.5 bg-transparent border-b border-[#1a1a1a]/12 text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 text-sm focus:outline-none focus:border-[#1a1a1a]/40 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1a1a1a]/25 hover:text-[#1a1a1a]/60"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {searchResults.length > 0 && (
                  <div className="mt-3 divide-y divide-[#1a1a1a]/5">
                    {searchResults.map(p => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                        className="flex items-center gap-3 py-2.5 hover:opacity-60 transition-opacity"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-8 h-11 object-cover flex-shrink-0 bg-[#1a1a1a]/5"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#1a1a1a] truncate">{p.name}</p>
                          <p className="text-[10px] text-[#1a1a1a]/40 mt-0.5">Rs. {p.price.toLocaleString()}</p>
                        </div>
                        {p.badge && (
                          <span className="text-[8px] tracking-widest uppercase px-1.5 py-0.5 border border-orange-500/30 text-orange-500 flex-shrink-0">
                            {p.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}

                {searchQuery.length > 1 && searchResults.length === 0 && (
                  <p className="mt-3 text-xs text-[#1a1a1a]/30">No results for "{searchQuery}"</p>
                )}
              </div>
            </div>
          )}
        </header>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="fixed top-0 left-0 bottom-0 w-72 bg-[#f5f0e8] z-50 lg:hidden animate-slide-right overflow-y-auto"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            <div className="p-6">

              {/* Drawer header */}
              <div className="flex items-center justify-between mb-10">
                <span className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/40">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="text-[#1a1a1a]/30 hover:text-[#1a1a1a] transition-colors">
                  <X size={17} />
                </button>
              </div>

              {/* Nav links */}
              <nav>
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`flex items-center justify-between py-4 border-b border-[#1a1a1a]/6 text-xs tracking-widest uppercase font-medium transition-colors ${
                      link.accent ? 'text-orange-500' : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="flex items-center justify-between py-4 border-b border-[#1a1a1a]/6 text-xs tracking-widest uppercase font-medium text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
                >
                  Contact
                </Link>
              </nav>

              {/* Cart */}
              <Link
                to="/cart"
                className="mt-8 flex items-center gap-3 text-xs text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors tracking-widest uppercase"
              >
                <ShoppingBag size={14} />
                Cart
                {itemCount > 0 && (
                  <span className="bg-orange-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Badges */}
              <div className="mt-12 flex flex-wrap gap-2">
                {['COD', 'Free Returns', 'Ships Nepal-Wide'].map(b => (
                  <span key={b} className="text-[8px] tracking-widest uppercase border border-[#1a1a1a]/12 text-[#1a1a1a]/30 px-2 py-1">
                    {b}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </>
      )}
    </>
  )
}