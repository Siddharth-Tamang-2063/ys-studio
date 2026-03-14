import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'

export default function OrderConfirmation() {
  const { state } = useLocation()
  const order = state?.order

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="font-display text-2xl font-light text-charcoal/40 mb-4">No order found</p>
        <Link to="/" className="text-sm font-sans text-sand underline">Go Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">

        {/* Success icon + heading */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-charcoal/5 flex items-center justify-center">
              <CheckCircle size={40} className="text-charcoal" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-xs tracking-ultra uppercase font-sans text-sand mb-3">Order Confirmed</p>
          <h1 className="font-display text-3xl md:text-4xl font-light text-charcoal mb-3">
            Thank You, {order.shipping.firstName}!
          </h1>
          <p className="font-sans text-charcoal/50 text-sm max-w-sm mx-auto">
            Your order has been placed successfully. We'll contact you at{' '}
            <span className="text-charcoal">{order.shipping.email}</span> with delivery updates.
          </p>
        </div>

        {/* Order ID + date */}
        <div className="flex items-center justify-between bg-charcoal text-cream px-6 py-4 mb-8">
          <div>
            <p className="text-xs tracking-widest uppercase font-sans text-cream/50 mb-1">Order ID</p>
            <p className="font-mono text-sm font-medium">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs tracking-widest uppercase font-sans text-cream/50 mb-1">Date</p>
            <p className="font-sans text-sm">{order.date}</p>
          </div>
        </div>

        {/* Order items */}
        <div className="border border-charcoal/10 bg-white mb-6">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-charcoal/10">
            <Package size={15} className="text-sand" />
            <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal">Items Ordered</p>
          </div>
          <div className="divide-y divide-charcoal/5">
            {order.items.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 px-6 py-4">
                <div className="w-14 h-18 overflow-hidden bg-cream-200 flex-shrink-0" style={{ height: '72px' }}>
                  <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base font-light text-charcoal truncate">{item.name}</p>
                  <p className="text-xs text-charcoal/50 font-sans mt-0.5">Size: {item.size} · Qty: {item.qty}</p>
                </div>
                <span className="font-sans text-sm font-medium text-charcoal flex-shrink-0">
                  Rs. {(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping + total */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Shipping address */}
          <div className="border border-charcoal/10 p-5 bg-white">
            <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-3">Shipping To</p>
            <p className="font-sans text-sm text-charcoal">{order.shipping.firstName} {order.shipping.lastName}</p>
            <p className="font-sans text-sm text-charcoal/60">{order.shipping.address}</p>
            <p className="font-sans text-sm text-charcoal/60">{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
          </div>

          {/* Price breakdown */}
          <div className="border border-charcoal/10 p-5 bg-white">
            <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-3">Payment Summary</p>
            <div className="space-y-1.5 text-sm font-sans">
              <div className="flex justify-between text-charcoal/60">
                <span>Subtotal</span>
                <span>Rs. {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-charcoal/60">
                <span>Delivery</span>
                <span>Rs. {order.shippingCost}</span>
              </div>
              <div className="flex justify-between font-medium text-charcoal border-t border-charcoal/10 pt-2 mt-2">
                <span>Total</span>
                <span>Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated delivery */}
        <div className="text-center mb-10 py-5 border border-dashed border-charcoal/20">
          <p className="text-xs tracking-widest uppercase font-sans text-charcoal/40 mb-1">Estimated Delivery</p>
          <p className="font-display text-xl font-light text-charcoal">2–3 Days (Kathmandu) · 3–7 Days (Nepal)</p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/collection"
            className="inline-flex items-center justify-center gap-2 bg-charcoal text-cream px-8 py-4 text-xs tracking-widest uppercase font-sans font-medium hover:bg-charcoal/80 transition-colors"
          >
            Continue Shopping <ArrowRight size={14} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 border border-charcoal/20 text-charcoal px-8 py-4 text-xs tracking-widest uppercase font-sans font-medium hover:border-charcoal transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}