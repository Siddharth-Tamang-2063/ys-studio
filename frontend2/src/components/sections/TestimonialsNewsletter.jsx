import React, { useState } from 'react'
import { TESTIMONIALS } from '../../data/products'
import StarRating from '../ui/StarRating'
import SectionHeader from '../ui/SectionHeader'

// Duplicate 3x for seamless loop — keyframes translate by -33.333%
const CARDS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

export function Testimonials() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Decorative quote mark */}
      <div className="absolute top-8 left-8 lg:left-16 font-display text-[10rem] text-cream/5 leading-none select-none pointer-events-none">"</div>

      <div className="relative mb-14">
        <SectionHeader overline="What Customers Say" title="Trusted Across Nepal" light centered />
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0D0B09, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0D0B09, transparent)' }} />

        <div className="flex gap-4 overflow-hidden">
          <div className="flex gap-4 animate-marquee-left">
            {CARDS.map((t, i) => (
              <TestimonialCard key={`row1-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 — scrolls right (slower) */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0D0B09, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0D0B09, transparent)' }} />

        <div className="flex gap-4 overflow-hidden">
          <div className="flex gap-4 animate-marquee-right">
            {[...CARDS].reverse().map((t, i) => (
              <TestimonialCard key={`row2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-20 border-t border-cream/5">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Happy Customers', value: '8K+' },
            { label: 'Cities in Nepal', value: '60+' },
            { label: 'Years in Business', value: '5+' },
            { label: 'Average Rating', value: '4.9★' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-light text-cream mb-2">{stat.value}</p>
              <p className="text-xs tracking-widest uppercase font-sans text-cream/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
          width: max-content;
        }
        .animate-marquee-right {
          animation: marquee-right 45s linear infinite;
          width: max-content;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

function TestimonialCard({ t }) {
  return (
    <div
      className="flex-shrink-0 w-72 md:w-80 p-6 rounded-none border border-cream/10 backdrop-blur-sm hover:border-sand/30 transition-all duration-300 group cursor-default"
      style={{ background: 'rgba(242, 235, 224, 0.04)' }}
    >
      {/* Top row: stars + quote icon */}
      <div className="flex items-center justify-between mb-4">
        <StarRating rating={t.rating} showCount={false} size="sm" />
        <span className="font-display text-3xl text-sand/30 leading-none group-hover:text-sand/50 transition-colors">"</span>
      </div>

      {/* Review text */}
      <p className="font-sans text-sm font-light text-cream/70 leading-relaxed mb-5 line-clamp-3 group-hover:text-cream/90 transition-colors">
        {t.review}
      </p>

      {/* Divider */}
      <div className="h-px bg-cream/10 mb-4 group-hover:bg-sand/20 transition-colors" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-9 h-9 rounded-full object-cover border border-sand/20 flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="font-sans font-medium text-cream text-xs truncate">{t.name}</p>
          <p className="font-sans text-cream/40 text-xs truncate">{t.role} · {t.location}</p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <span className="text-xs tracking-widest uppercase font-sans text-sand/60 bg-sand/10 px-2 py-0.5 rounded-sm">
            Verified
          </span>
        </div>
      </div>

      {/* Product tag */}
      <p className="mt-3 text-xs tracking-widest uppercase font-sans text-sand/50 truncate">{t.product}</p>
    </div>
  )
}

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (email.trim()) setSubmitted(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    // bg-cream gives this section an explicit light background so
    // text-charcoal is always visible regardless of parent page bg.
    // Remove bg-cream if your page already has a light background.
    <section className="py-24 px-6 lg:px-8 bg-cream">
      <div className="max-w-2xl mx-auto text-center">

        <p className="text-xs tracking-widest uppercase font-sans font-medium text-sand mb-4">
          Stay Updated
        </p>

        <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal mb-4">
          Get New Arrivals &amp; Offers
        </h2>

        <p className="font-sans font-light text-charcoal/60 mb-10 text-lg">
          Be the first to know about new products, sale offers, and special deals.
          No spam, unsubscribe anytime.
        </p>

        {submitted ? (
          <div className="py-8">
            <p className="font-display text-2xl font-light text-charcoal">You're subscribed!</p>
            <p className="text-sm text-charcoal/50 font-sans mt-2">We'll send you updates soon.</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email"
              className="flex-1 border border-charcoal/20 bg-transparent px-5 py-3.5 font-sans text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-sand transition-colors"
            />
            <button
              onClick={handleSubmit}
              className="btn-primary whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        )}

        <p className="mt-4 text-xs font-sans text-charcoal/30">
          No spam. Unsubscribe anytime with one click.
        </p>

      </div>
    </section>
  )
}