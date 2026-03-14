import React from 'react'

export default function SectionHeader({ overline, title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      {overline && (
        <p className={`text-xs tracking-ultra uppercase font-sans font-medium mb-4 ${light ? 'text-sand-light' : 'text-sand'}`}>
          {overline}
        </p>
      )}
      <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight ${light ? 'text-cream' : 'text-charcoal'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 font-sans text-base md:text-lg font-light max-w-xl ${centered ? 'mx-auto' : ''} ${light ? 'text-cream/60' : 'text-charcoal/60'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
