import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const SLIDES = [
  {
    image: 'https://plus.unsplash.com/premium_photo-1673356302067-aac3b545a362?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tag: 'New Drops 2025',
    line1: 'Wear it',
    line2: 'Different.',
    sub: 'Premium Streetwear · Delivered across Nepal · Cash on Delivery',
    cta: 'Shop New Drops',
    ctaLink: '/collection?collection=new-drops',
    accent: '#E8A020',
  },
  {
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1600&q=90',
    tag: 'Thrift Archive',
    line1: 'One of a',
    line2: 'Kind.',
    sub: 'Vintage & thrifted finds — each piece is unique · Limited stock',
    cta: 'Shop Thrift',
    ctaLink: '/collection?collection=thrift-archive',
    accent: '#7C5CBF',
  },
  {
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1600&q=90',
    tag: 'Winter Street Pack',
    line1: 'Layer up,',
    line2: 'Stand out.',
    sub: 'Hoodies, puffers & jackets built for Kathmandu winters',
    cta: 'Shop Winter Pack',
    ctaLink: '/collection?collection=winter-pack',
    accent: '#2E7D52',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const intervalRef = useRef(null)
  const progressRef = useRef(null)
  const DURATION = 6000

  useEffect(() => { setTimeout(() => setReady(true), 100) }, [])

  const goTo = (idx) => {
    if (transitioning || idx === current) return
    setTransitioning(true)
    setCurrent(idx)
    setProgress(0)
    setTimeout(() => setTransitioning(false), 850)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => goTo((current + 1) % SLIDES.length), DURATION)
    return () => clearInterval(intervalRef.current)
  }, [current, transitioning])

  useEffect(() => {
    setProgress(0)
    const start = performance.now()
    const tick = (now) => {
      const pct = Math.min(((now - start) / DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) progressRef.current = requestAnimationFrame(tick)
    }
    progressRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(progressRef.current)
  }, [current])

  const slide = SLIDES[current]
  const show = ready && !transitioning

  return (
    <section
      className="relative overflow-hidden bg-[#080808]"
      style={{ height: 'calc(100vh)', minHeight: '600px', maxHeight: '980px' }}
    >

      {/* BG Images */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
            transition: 'opacity 1.1s ease',
          }}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{
              transform: i === current && !transitioning ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 7s ease-out',
            }}
          />
          {/* Dark left gradient — heavier for streetwear mood */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.65) 55%, rgba(8,8,8,0.15) 100%)',
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 50%)',
            }}
          />
          {/* Grain texture overlay for thrift/streetwear feel */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
              opacity: 0.35,
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 w-full">

          {/* Category Tag */}
          <div className="overflow-hidden mb-6">
            <p
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 400,
                fontSize: '10px',
                letterSpacing: '0.55em',
                textTransform: 'uppercase',
                color: slide.accent,
                transform: show ? 'translateY(0)' : 'translateY(120%)',
                transition: 'transform 0.65s cubic-bezier(0.76,0,0.24,1)',
              }}
            >
              ✦ {slide.tag}
            </p>
          </div>

          {/* Line 1 — light faded */}
          <div className="overflow-hidden">
            <span
              style={{
                display: 'block',
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 300,
                fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.45)',
                transform: show ? 'translateY(0)' : 'translateY(110%)',
                transition: 'transform 0.85s cubic-bezier(0.76,0,0.24,1) 0.08s',
              }}
            >
              {slide.line1}
            </span>
          </div>

          {/* Line 2 — bold italic hero word */}
          <div className="overflow-hidden mb-10">
            <span
              style={{
                display: 'block',
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: 'clamp(3.8rem, 10vw, 9.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                transform: show ? 'translateY(0)' : 'translateY(110%)',
                transition: 'transform 0.85s cubic-bezier(0.76,0,0.24,1) 0.17s',
              }}
            >
              {slide.line2}
              <span style={{ color: slide.accent }}> ✦</span>
            </span>
          </div>

          {/* Subtitle + Buttons */}
          <div
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s',
            }}
          >
            {/* Subtitle */}
            <p
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: '36px',
              }}
            >
              {slide.sub}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-3">

              {/* Primary CTA */}
              <Link
                to={slide.ctaLink}
                className="group inline-flex items-center gap-3 text-white transition-opacity duration-200 hover:opacity-85"
                style={{
                  background: slide.accent,
                  padding: '14px 36px',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 600,
                  fontSize: '11px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                }}
              >
                {slide.cta}
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>

              {/* Secondary — Thrift special link on slide 2, otherwise Browse All */}
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white/75 transition-colors duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '14px 36px',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 400,
                  fontSize: '11px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                }}
              >
                Browse All
              </Link>

            </div>

            {/* Trust badges — streetwear specific */}
            <div
              className="flex items-center gap-6 mt-10"
              style={{ opacity: show ? 1 : 0, transition: 'opacity 0.6s ease 0.55s' }}
            >
              {['COD Available', 'Free Returns', 'Ships Nepal-Wide'].map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '9px',
                    fontWeight: 400,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.2)',
                  }}
                >
                  · {badge}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Progress bar + bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}>
          <div
            style={{
              height: '1px',
              width: `${progress}%`,
              background: slide.accent,
              transition: 'width 0.12s linear',
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-5 flex items-center justify-between">

          {/* Slide counters */}
          <div className="flex items-center gap-8">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.4em',
                  color:
                    i === current
                      ? 'rgba(255,255,255,0.75)'
                      : 'rgba(255,255,255,0.18)',
                  transition: 'color 0.3s ease',
                }}
              >
                0{i + 1}
              </button>
            ))}
          </div>

          {/* Right label */}
          <span
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.15)',
              display: 'none',
            }}
            className="md:block"
          >
            Streetwear · Nepal · {new Date().getFullYear()}
          </span>

        </div>
      </div>

      {/* Mobile dots */}
      <div className="absolute bottom-14 right-6 z-20 flex md:hidden flex-col items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: '3px',
              height: i === current ? '22px' : '5px',
              background:
                i === current ? slide.accent : 'rgba(255,255,255,0.18)',
              borderRadius: '2px',
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>

    </section>
  )
}