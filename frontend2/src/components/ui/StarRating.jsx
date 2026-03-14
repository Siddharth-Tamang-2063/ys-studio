import React from 'react'

export default function StarRating({ rating, reviews, showCount = true, size = 'sm' }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  const sz = size === 'sm' ? 12 : size === 'md' ? 16 : 20

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {stars.map(s => (
          <svg key={s} width={sz} height={sz} viewBox="0 0 20 20" fill="none">
            <path
              d="M10 1L12.39 6.26L18.18 7.27L14.09 11.22L15.06 17L10 14.27L4.94 17L5.91 11.22L1.82 7.27L7.61 6.26L10 1Z"
              fill={s <= Math.floor(rating) ? '#C8A97E' : s - 0.5 <= rating ? 'url(#half)' : '#E2D9CF'}
              stroke="none"
            />
            <defs>
              <linearGradient id="half" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor="#C8A97E" />
                <stop offset="50%" stopColor="#E2D9CF" />
              </linearGradient>
            </defs>
          </svg>
        ))}
      </div>
      {showCount && reviews !== undefined && (
        <span className="text-xs text-charcoal/50 font-sans">({reviews})</span>
      )}
    </div>
  )
}
