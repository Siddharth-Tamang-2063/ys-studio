import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Youtube, ArrowRight, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  Shop: [
    { label: 'New Arrivals', href: '/collection?filter=new' },
    { label: 'Best Sellers', href: '/collection?filter=bestseller' },
    { label: 'Sneakers', href: '/collection?category=sneakers' },
    { label: 'Boots', href: '/collection?category=boots' },
    { label: 'Sandals', href: '/collection?category=sandals' },
    { label: 'Formals', href: '/collection?category=formals' },
    { label: 'Sale', href: '/collection?filter=sale' },
  ],
  Help: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Size Guide & Fit', href: '/contact' },
    { label: 'Delivery & Exchange', href: '/contact' },
    { label: 'Track Your Order', href: '/contact' },
    { label: 'FAQ', href: '/contact' },
  ],
  Company: [
    { label: 'About Us', href: '/contact' },
    { label: 'Our Story', href: '/contact' },
    { label: 'Careers', href: '/contact' },
    { label: 'Become a Reseller', href: '/contact' },
    { label: 'Wholesale Inquiry', href: '/contact' },
  ],
}

const SOCIALS = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="bg-charcoal text-cream/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="block mb-6">
              <span className="font-display text-3xl font-semibold tracking-[0.15em] text-cream uppercase">Level Up Fashion</span>
              <span className="block font-sans text-[10px] tracking-[0.4em] uppercase text-cream/35 mt-1">Footwear · Nepal</span>
            </Link>
            <p className="font-sans text-sm font-light text-cream/60 leading-relaxed max-w-xs mb-8">
              Quality footwear for everyday Nepal. Sneakers, boots, sandals and formals — delivered to your door. Cash on Delivery available nationwide.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs tracking-widest uppercase font-sans font-medium text-sand mb-4">Get Updates & Offers</p>
              {subscribed ? (
                <p className="text-sm font-sans text-sage">Thank you — you're now subscribed!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 bg-transparent border-b border-cream/20 pb-2 text-cream placeholder:text-cream/30 font-sans text-sm focus:outline-none focus:border-sand transition-colors min-w-0"
                  />
                  <button type="submit" className="ml-4 text-sand hover:text-cream transition-colors duration-200 flex-shrink-0">
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-8">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 border border-cream/10 flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/30 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs tracking-widest uppercase font-sans font-medium text-cream mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href}
                      className="text-sm font-sans font-light text-cream/50 hover:text-cream transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-sans text-cream/30">© 2025 YS Studio. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Exchange Policy'].map(t => (
              <Link key={t} to="/contact" className="text-xs font-sans text-cream/30 hover:text-cream/60 transition-colors">{t}</Link>
            ))}
          </div>

          {/* Payment icons */}
          <div className="flex items-center gap-2">
            {['COD', 'eSewa', 'Khalti'].map(p => (
              <span key={p} className="border border-cream/10 px-2 py-1 text-[10px] font-mono text-cream/30">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}