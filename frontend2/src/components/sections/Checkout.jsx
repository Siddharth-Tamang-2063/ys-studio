import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Lock, Truck, CheckCircle, Upload, X, Image } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'

const SHIPPING_RATE = 150
const STEPS = ['Shipping', 'Payment', 'Review']

const PAYMENT_METHODS = [
  {
    id: 'cod',
    name: 'Cash on Delivery (COD)',
    description: 'Pay cash when your order arrives at your door',
    color: '#2D6A4F',
  },
  {
    id: 'esewa',
    name: 'eSewa',
    description: 'Pay using your eSewa digital wallet',
    color: '#60BB46',
  },
  {
    id: 'khalti',
    name: 'Khalti',
    description: 'Pay using your Khalti digital wallet',
    color: '#5C2D91',
  },
]

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const fileRef = useRef(null)

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'NP',
  })

  const [selectedPayment, setSelectedPayment] = useState(null)
  const [paymentId, setPaymentId] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [screenshotPreview, setScreenshotPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [errors, setErrors] = useState({})

  const shippingCost = items.length > 0 ? SHIPPING_RATE : 0
  const total = subtotal + shippingCost

  const validateShipping = () => {
    const e = {}
    if (!shipping.firstName.trim()) e.firstName = 'Required'
    if (!shipping.lastName.trim()) e.lastName = 'Required'
    if (!shipping.email.trim()) e.email = 'Required'
    if (!shipping.address.trim()) e.address = 'Required'
    if (!shipping.city.trim()) e.city = 'Required'
    if (!shipping.zip.trim()) e.zip = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validatePayment = () => {
    const e = {}
    if (!selectedPayment) e.method = 'Please select a payment method'
    if (selectedPayment !== 'cod') {
      if (!paymentId.trim()) e.paymentId = 'Please enter your registered phone number'
      if (!screenshot) e.screenshot = 'Please upload your transaction screenshot'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 0 && !validateShipping()) return
    if (step === 1 && !validatePayment()) return
    setErrors({})
    setStep(s => s + 1)
  }

  const handlePlaceOrder = () => {
    const order = {
      id: `LUF-${Date.now().toString().slice(-6)}`,
      items,
      shipping,
      payment: { method: selectedPayment, phone: paymentId, screenshot: screenshotPreview },
      subtotal,
      shippingCost,
      total,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    }
    clearCart()
    navigate('/order-confirmation', { state: { order } })
  }

  const handleFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors(e => ({ ...e, screenshot: 'Only image files are allowed' }))
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(e => ({ ...e, screenshot: 'File must be under 5MB' }))
      return
    }
    setScreenshot(file)
    setErrors(e => ({ ...e, screenshot: null }))
    const reader = new FileReader()
    reader.onload = (ev) => setScreenshotPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const removeScreenshot = () => {
    setScreenshot(null)
    setScreenshotPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="font-display text-2xl font-light text-charcoal/40 mb-4">Your bag is empty</p>
        <Link to="/collection" className="text-sm font-sans text-sand underline">Shop Collection</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link to="/cart" className="flex items-center gap-1.5 text-xs tracking-widest uppercase font-sans text-charcoal/50 hover:text-charcoal transition-colors">
            <ArrowLeft size={14} /> Back to Bag
          </Link>
          <div className="flex items-center gap-1 text-xs font-sans text-charcoal/40">
            <Lock size={11} />
            <span>Secure Checkout</span>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-medium transition-all duration-300 ${
                  i < step ? 'bg-charcoal text-cream' :
                  i === step ? 'bg-charcoal text-cream' :
                  'bg-charcoal/10 text-charcoal/40'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs tracking-widest uppercase font-sans hidden sm:block ${i === step ? 'text-charcoal font-medium' : 'text-charcoal/40'}`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-16 md:w-24 h-px mx-2 mb-5 transition-all duration-300 ${i < step ? 'bg-charcoal' : 'bg-charcoal/15'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">

          {/* ── Left: Form ── */}
          <div>

            {/* Step 0: Shipping */}
            {step === 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Truck size={18} className="text-sand" />
                  <h2 className="font-display text-2xl font-light text-charcoal">Shipping Information</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name" error={errors.firstName}>
                    <input value={shipping.firstName} onChange={e => setShipping({...shipping, firstName: e.target.value})}
                      className={inputCls(errors.firstName)} placeholder="Ram" />
                  </Field>
                  <Field label="Last Name" error={errors.lastName}>
                    <input value={shipping.lastName} onChange={e => setShipping({...shipping, lastName: e.target.value})}
                      className={inputCls(errors.lastName)} placeholder="Sharma" />
                  </Field>
                  <Field label="Email" error={errors.email} className="col-span-2">
                    <input type="email" value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})}
                      className={inputCls(errors.email)} placeholder="ram@example.com" />
                  </Field>
                  <Field label="Phone" className="col-span-2">
                    <input value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})}
                      className={inputCls()} placeholder="+977 98XXXXXXXX" />
                  </Field>
                  <Field label="Address" error={errors.address} className="col-span-2">
                    <input value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})}
                      className={inputCls(errors.address)} placeholder="Thamel, Ward No. 26" />
                  </Field>
                  <Field label="City" error={errors.city}>
                    <input value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})}
                      className={inputCls(errors.city)} placeholder="Kathmandu" />
                  </Field>
                  <Field label="ZIP Code" error={errors.zip}>
                    <input value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})}
                      className={inputCls(errors.zip)} placeholder="44600" />
                  </Field>
                  <Field label="Province">
                    <input value={shipping.state} onChange={e => setShipping({...shipping, state: e.target.value})}
                      className={inputCls()} placeholder="Bagmati" />
                  </Field>
                  <Field label="Country">
                    <select value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})}
                      className={inputCls()}>
                      <option value="NP">Nepal</option>
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                </div>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl font-light text-charcoal mb-2">Payment Method</h2>
                <p className="text-sm font-sans text-charcoal/50 mb-8">Choose your wallet, pay, then upload your screenshot</p>

                {/* Method selector */}
                {errors.method && <p className="text-xs text-red-500 font-sans mb-4">{errors.method}</p>}

                <div className="space-y-3 mb-6">
                  {PAYMENT_METHODS.map(method => (
                    <button
                      key={method.id}
                      onClick={() => { setSelectedPayment(method.id); setErrors({}) }}
                      className={`w-full flex items-center gap-5 p-5 border-2 text-left transition-all duration-200 ${
                        selectedPayment === method.id
                          ? 'border-charcoal bg-charcoal/[0.03]'
                          : 'border-charcoal/15 bg-white hover:border-charcoal/40'
                      }`}
                    >
                      <div
                        className="w-14 h-10 rounded flex items-center justify-center flex-shrink-0 font-sans font-bold text-white text-base"
                        style={{ background: method.color }}
                      >
                        {method.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-sans font-medium text-charcoal text-sm">{method.name}</p>
                        <p className="font-sans text-xs text-charcoal/50 mt-0.5">{method.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        selectedPayment === method.id ? 'border-charcoal bg-charcoal' : 'border-charcoal/20'
                      }`}>
                        {selectedPayment === method.id && <CheckCircle size={12} className="text-cream" />}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Phone + screenshot — shows after method selected, but not for COD */}
                {selectedPayment && selectedPayment !== 'cod' && (
                  <div className="space-y-6">

                    {/* Step instructions */}
                    <div
                      className="p-4 text-xs font-sans space-y-1.5 rounded-sm"
                      style={{
                        background: selectedPayment === 'esewa' ? '#f0fce8' : '#f5f0fc',
                        color: selectedPayment === 'esewa' ? '#3a7a28' : '#5C2D91'
                      }}
                    >
                      <p className="font-medium text-sm mb-2">
                        {selectedPayment === 'esewa' ? '💚 How to pay with eSewa' : '💜 How to pay with Khalti'}
                      </p>
                      <p>1. Open your {selectedPayment === 'esewa' ? 'eSewa' : 'Khalti'} app</p>
                      <p>2. Send <strong>Rs. {total.toLocaleString()}</strong> to our merchant number</p>
                      <p>3. Take a screenshot of the successful transaction</p>
                      <p>4. Enter your phone number and upload the screenshot below</p>
                    </div>

                    {/* Phone number */}
                    <Field
                      label={`Registered ${selectedPayment === 'esewa' ? 'eSewa' : 'Khalti'} Phone Number`}
                      error={errors.paymentId}
                    >
                      <input
                        type="tel"
                        value={paymentId}
                        onChange={e => { setPaymentId(e.target.value); setErrors(ev => ({ ...ev, paymentId: null })) }}
                        className={inputCls(errors.paymentId)}
                        placeholder="+977 98XXXXXXXX"
                      />
                    </Field>

                    {/* Screenshot upload */}
                    <div>
                      <label className={`text-xs tracking-widest uppercase font-sans font-medium block mb-2 ${errors.screenshot ? 'text-red-500' : 'text-charcoal/60'}`}>
                        {errors.screenshot || 'Transaction Screenshot *'}
                      </label>

                      {!screenshotPreview ? (
                        <div
                          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleDrop}
                          onClick={() => fileRef.current?.click()}
                          className={`relative border-2 border-dashed rounded-sm p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                            dragOver
                              ? 'border-sand bg-sand/5'
                              : errors.screenshot
                              ? 'border-red-300 bg-red-50/30 hover:border-red-400'
                              : 'border-charcoal/20 bg-white hover:border-charcoal/40 hover:bg-cream-50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${dragOver ? 'bg-sand/10' : 'bg-charcoal/5'}`}>
                            <Upload size={20} className={dragOver ? 'text-sand' : 'text-charcoal/40'} />
                          </div>
                          <p className="font-sans text-sm font-medium text-charcoal mb-1">
                            {dragOver ? 'Drop it here' : 'Upload Screenshot'}
                          </p>
                          <p className="font-sans text-xs text-charcoal/40 text-center">
                            Drag & drop or click to browse<br />PNG, JPG, WEBP · Max 5MB
                          </p>
                          <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => handleFile(e.target.files[0])}
                          />
                        </div>
                      ) : (
                        <div className="relative border border-charcoal/15 bg-white p-3 rounded-sm">
                          <div className="flex items-start gap-4">
                            {/* Preview thumbnail */}
                            <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-cream-200 rounded-sm">
                              <img src={screenshotPreview} alt="Transaction screenshot" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Image size={13} className="text-green-500 flex-shrink-0" />
                                <p className="text-xs font-sans font-medium text-charcoal truncate">{screenshot?.name}</p>
                              </div>
                              <p className="text-xs font-sans text-charcoal/40">
                                {screenshot ? (screenshot.size / 1024).toFixed(0) + ' KB' : ''}
                              </p>
                              <div className="flex items-center gap-1 mt-2">
                                <CheckCircle size={12} className="text-green-500" />
                                <span className="text-xs font-sans text-green-600">Screenshot uploaded</span>
                              </div>
                              <button
                                onClick={removeScreenshot}
                                className="mt-3 text-xs font-sans text-charcoal/40 hover:text-red-400 transition-colors flex items-center gap-1"
                              >
                                <X size={11} /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* COD confirmation message */}
                {selectedPayment === 'cod' && (
                  <div className="mt-4 p-4 text-xs font-sans space-y-1.5 rounded-sm" style={{ background: '#f0fdf4', color: '#166534' }}>
                    <p className="font-medium text-sm mb-2">🏠 Cash on Delivery Selected</p>
                    <p>You will pay <strong>Rs. {total.toLocaleString()}</strong> in cash when your order arrives.</p>
                    <p>Please keep the exact amount ready for the delivery person.</p>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-2 text-xs font-sans text-charcoal/40">
                  <Lock size={11} />
                  Your order details are safe and secure.
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl font-light text-charcoal mb-8">Review Order</h2>

                {/* Shipping summary */}
                <div className="border border-charcoal/10 p-5 mb-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal">Shipping To</p>
                    <button onClick={() => setStep(0)} className="text-xs font-sans text-sand underline">Edit</button>
                  </div>
                  <p className="font-sans text-sm text-charcoal">{shipping.firstName} {shipping.lastName}</p>
                  <p className="font-sans text-sm text-charcoal/60">{shipping.address}</p>
                  <p className="font-sans text-sm text-charcoal/60">{shipping.city}, {shipping.state} {shipping.zip}</p>
                  <p className="font-sans text-sm text-charcoal/60">{shipping.email}</p>
                </div>

                {/* Payment summary */}
                <div className="border border-charcoal/10 p-5 mb-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal">Payment</p>
                    <button onClick={() => setStep(1)} className="text-xs font-sans text-sand underline">Edit</button>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-10 h-7 rounded flex items-center justify-center font-sans font-bold text-white text-xs flex-shrink-0"
                        style={{ background: PAYMENT_METHODS.find(m => m.id === selectedPayment)?.color }}
                      >
                        {PAYMENT_METHODS.find(m => m.id === selectedPayment)?.name[0]}
                      </div>
                      <div>
                        <p className="font-sans text-sm text-charcoal">{PAYMENT_METHODS.find(m => m.id === selectedPayment)?.name}</p>
                        <p className="font-sans text-xs text-charcoal/50">{paymentId}</p>
                      </div>
                    </div>
                    {/* Screenshot thumbnail in review */}
                    {screenshotPreview && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-12 h-14 overflow-hidden rounded-sm border border-charcoal/10">
                          <img src={screenshotPreview} alt="Transaction" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <CheckCircle size={11} className="text-green-500" />
                            <span className="text-xs font-sans text-green-600">SS uploaded</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Items list */}
                <div className="space-y-4">
                  {items.map(item => {
                    const productMatch = PRODUCTS.find(p => p.id === item.id)
                    const imageSrc = item.images?.[0] || productMatch?.images?.[0]
                    return (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4 py-4 border-b border-charcoal/5 last:border-0">
                        <div className="w-16 h-20 overflow-hidden bg-cream-200 flex-shrink-0">
                          <img src={imageSrc} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-base font-light text-charcoal truncate">{item.name}</p>
                          <p className="text-xs text-charcoal/50 font-sans mt-0.5">Size: {item.size} · Qty: {item.qty}</p>
                        </div>
                        <span className="font-sans text-sm font-medium text-charcoal flex-shrink-0">
                          Rs. {(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-10">
              {step > 0 ? (
                <button onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-2 text-xs tracking-widest uppercase font-sans text-charcoal/50 hover:text-charcoal transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
              ) : <div />}

              {step < 2 ? (
                <button onClick={handleNext}
                  className="flex items-center gap-2 bg-charcoal text-cream px-8 py-4 text-xs tracking-widest uppercase font-sans font-medium hover:bg-charcoal/80 transition-colors">
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button onClick={handlePlaceOrder}
                  className="flex items-center gap-2 bg-charcoal text-cream px-8 py-4 text-xs tracking-widest uppercase font-sans font-medium hover:bg-charcoal/80 transition-colors">
                  <Lock size={13} /> Place Order
                </button>
              )}
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-charcoal/10 p-6">
              <h3 className="font-display text-lg font-light text-charcoal mb-5">Order Summary</h3>
              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto pr-1">
                {items.map(item => {
                  const productMatch = PRODUCTS.find(p => p.id === item.id)
                  const imageSrc = item.images?.[0] || productMatch?.images?.[0]
                  return (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3 items-center">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-14 overflow-hidden bg-cream-200">
                          <img src={imageSrc} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-charcoal text-cream text-[9px] font-sans flex items-center justify-center rounded-full">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-xs text-charcoal truncate">{item.name}</p>
                        <p className="text-xs text-charcoal/40 font-sans">{item.size}</p>
                      </div>
                      <span className="font-sans text-xs font-medium text-charcoal flex-shrink-0">
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-charcoal/10 pt-4 space-y-2 text-sm font-sans">
                <div className="flex justify-between text-charcoal/60">
                  <span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-charcoal/60">
                  <span>Delivery</span><span>{shippingCost === 0 ? 'Free' : `Rs. ${shippingCost}`}</span>
                </div>
              </div>
              <div className="border-t border-charcoal/20 mt-3 pt-3 flex justify-between">
                <span className="font-sans font-medium text-charcoal">Total</span>
                <span className="font-display text-xl font-light text-charcoal">Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className={`text-xs tracking-widest uppercase font-sans font-medium ${error ? 'text-red-500' : 'text-charcoal/60'}`}>
        {error || label}
      </label>
      {children}
    </div>
  )
}

function inputCls(error) {
  return `w-full px-4 py-3 text-sm font-sans border bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none transition-colors ${
    error ? 'border-red-300 focus:border-red-400' : 'border-charcoal/20 focus:border-sand'
  }`
}