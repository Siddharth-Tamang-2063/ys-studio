import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'

function useCountdown(targetHours = 47) {
  const [time, setTime] = useState({ h: targetHours, m: 59, s: 59 })
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 }
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 }
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 }
        return { h: 0, m: 0, s: 0 }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function PromoBanner() {
  const time = useCountdown(47)
  const pad = n => String(n).padStart(2, '0')

  return (
    <section className="relative overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[400px]">
        {/* Left - Image */}
        <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
          <img
            src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80"
            alt="Footwear sale"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal/20" />
        </div>

        {/* Right - Content */}
        <div className="bg-charcoal flex items-center justify-center p-12 md:p-16">
          <div>
            <p className="text-xs tracking-ultra uppercase font-sans font-medium text-sand mb-4">Limited Time Offer</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-2">Up to</h2>
            <div className="font-display text-8xl md:text-9xl font-light text-sand leading-none mb-6">40%</div>
            <p className="font-sans text-cream/60 text-lg font-light mb-8">
              Big discounts on sneakers, boots, and sandals. Limited pairs — grab your size before it sells out.
            </p>

            {/* Countdown */}
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase font-sans text-cream/40 mb-3">Offer ends in</p>
              <div className="flex items-center gap-3">
                {[{ v: time.h, l: 'hrs' }, { v: time.m, l: 'min' }, { v: time.s, l: 'sec' }].map(({ v, l }, i) => (
                  <React.Fragment key={l}>
                    <div className="text-center">
                      <div className="font-mono text-3xl font-light text-cream w-16 text-center tabular-nums">
                        {pad(v)}
                      </div>
                      <div className="text-xs tracking-widest uppercase font-sans text-cream/40 mt-1">{l}</div>
                    </div>
                    {i < 2 && <span className="font-display text-2xl text-cream/30 mt-[-8px]">:</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <Link to="/collection?filter=sale"
              className="inline-flex items-center gap-3 bg-sand text-white px-8 py-4 text-sm tracking-widest uppercase font-sans font-medium hover:bg-sand-dark transition-colors duration-200 group">
              Shop Sale Now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}