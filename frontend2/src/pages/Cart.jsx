import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'
import { useNavigate } from 'react-router-dom'



const SHIPPING_RATE = 150

export default function Cart() {
  const { items, removeItem, updateQty, clearCart, subtotal, itemCount } = useCart()
  const navigate = useNavigate()

  const shipping = items.length > 0 ? SHIPPING_RATE : 0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag size={56} className="text-charcoal/20 mb-6" strokeWidth={1} />
        <h2 className="font-display text-3xl font-light text-charcoal mb-3">Your bag is empty</h2>
        <p className="text-charcoal/50 font-sans mb-8 max-w-sm">
          You haven't added anything yet. Browse our collection to find something you like.
        </p>
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 bg-charcoal text-cream px-8 py-3.5 text-xs tracking-widest uppercase font-sans font-medium hover:bg-charcoal/80 transition-colors"
        >
          Shop Now <ArrowRight size={14} />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-light text-charcoal">
          Shopping Bag
        </h1>
        <span className="text-sm text-charcoal/50 font-sans">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">

        {/* Cart Items */}
        <div className="divide-y divide-charcoal/10">
          {items.map((item) => {
            const productMatch = PRODUCTS.find(p => p.id === item.id)
            const imageSrc = item.images?.[0] || item.image || productMatch?.images?.[0]

            return (
              <div key={`${item.id}-${item.size}`} className="flex gap-5 py-6 group">
                {/* Image */}
                <Link to={`/product/${item.slug}`} className="flex-shrink-0">
                  <div className="w-24 h-32 md:w-28 md:h-36 overflow-hidden bg-cream-200">
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-sand font-medium font-sans mb-1">
                        {item.category}
                      </p>
                      <Link to={`/product/${item.slug}`}>
                        <h3 className="font-display text-lg md:text-xl font-light text-charcoal leading-tight hover:text-sand transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-charcoal/50 font-sans mt-1">Size: {item.size}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-charcoal/30 hover:text-red-400 transition-colors flex-shrink-0 mt-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Qty controls */}
                    <div className="flex items-center border border-charcoal/20">
                      <button
                        onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-cream-200 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-sm font-sans text-charcoal border-x border-charcoal/20">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-cream-200 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="font-sans font-medium text-charcoal">
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </span>
                      {item.qty > 1 && (
                        <p className="text-xs text-charcoal/40 font-sans">Rs. {item.price.toLocaleString()} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Clear cart */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={clearCart}
              className="text-xs text-charcoal/40 hover:text-red-400 font-sans tracking-wide transition-colors"
            >
              Clear bag
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-cream-100 border border-charcoal/10 p-6 md:p-8">
            <h2 className="font-display text-xl font-light text-charcoal mb-6">Order Summary</h2>

            {/* Line items */}
            <div className="space-y-3 text-sm font-sans border-t border-charcoal/10 pt-5">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-charcoal/70">
                <span>Delivery</span>
                <span>Rs. {shipping}</span>
              </div>
              <p className="text-xs text-charcoal/40">Free delivery inside Kathmandu Valley</p>
            </div>

            <div className="flex justify-between items-baseline border-t border-charcoal/20 mt-4 pt-4">
              <span className="font-sans font-medium text-charcoal">Total</span>
              <span className="font-display text-2xl font-light text-charcoal">Rs. {total.toLocaleString()}</span>
            </div>

           <button onClick={() => navigate('/checkout')} className="w-full mt-6 flex items-center justify-center gap-2 bg-charcoal text-cream py-4 text-xs tracking-widest uppercase font-sans font-medium hover:bg-charcoal/80 transition-colors">
  Checkout <ArrowRight size={14} />
</button>

            <Link
              to="/collection"
              className="block text-center mt-4 text-xs text-charcoal/50 hover:text-charcoal font-sans tracking-wide transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}