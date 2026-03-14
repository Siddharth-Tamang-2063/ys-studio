import React from 'react'

const variants = {
  primary: 'bg-charcoal text-cream hover:bg-charcoal-800 focus:ring-sand',
  outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream focus:ring-charcoal',
  sand: 'bg-sand text-white hover:bg-sand-dark focus:ring-sand',
  ghost: 'text-charcoal hover:text-sand focus:ring-transparent',
  white: 'bg-white text-charcoal hover:bg-cream focus:ring-charcoal',
}
const sizes = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-4 text-sm',
  icon: 'p-3',
}

export default function Button({ variant = 'primary', size = 'md', children, className = '', loading, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 tracking-widest uppercase font-sans font-medium transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  )
}
