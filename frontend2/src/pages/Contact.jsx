import React, { useState } from 'react'
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube, Clock, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-charcoal py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-ultra uppercase font-sans text-sand mb-4">We're Here to Help</p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-cream mb-6">Get in Touch</h1>
          <p className="font-sans font-light text-cream/60 text-lg max-w-xl mx-auto">
            Questions about sizing, orders, or just want to say hello? Our team typically responds within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-10">
            {[
              { Icon: MapPin, title: 'Visit Us', lines: ['12 Rue du Faubourg', 'Paris, France 75008'] },
              { Icon: Mail, title: 'Email Us', lines: ['hello@YS Studio.com', 'support@YS Studio.com'] },
              { Icon: Phone, title: 'Call Us', lines: ['+33 1 23 45 67 89', 'Mon–Fri 9am–6pm CET'] },
              { Icon: Clock, title: 'Hours', lines: ['Monday–Friday: 9–18h', 'Saturday: 10–16h'] },
            ].map(({ Icon, title, lines }) => (
              <div key={title} className="flex gap-5">
                <div className="w-10 h-10 border border-charcoal/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-sand" />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-2">{title}</p>
                  {lines.map(l => <p key={l} className="text-sm font-sans text-charcoal/60 font-light">{l}</p>)}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div>
              <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-4">Follow YS Studio</p>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, label: 'Instagram', href: '#' },
                  { Icon: Twitter, label: 'Twitter', href: '#' },
                  { Icon: Facebook, label: 'Facebook', href: '#' },
                  { Icon: Youtube, label: 'YouTube', href: '#' },
                ].map(({ Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label}
                    className="w-10 h-10 border border-charcoal/15 flex items-center justify-center text-charcoal/50 hover:text-sand hover:border-sand transition-all duration-200">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <CheckCircle size={48} className="text-sage mb-6" />
                <p className="font-display text-3xl font-light text-charcoal mb-3">Message Sent</p>
                <p className="font-sans text-charcoal/50 max-w-sm">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="mt-8 btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-3">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="input-luxury" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-3">Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="input-luxury" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-3">Subject</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="input-luxury bg-transparent appearance-none cursor-pointer">
                    <option value="">Select a topic</option>
                    <option>Order Inquiry</option>
                    <option>Returns & Exchanges</option>
                    <option>Product Question</option>
                    <option>Wholesale Inquiry</option>
                    <option>Press & Media</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-3">Message *</label>
                  <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={6} placeholder="Tell us how we can help..."
                    className="input-luxury resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary flex items-center gap-2 disabled:opacity-70">
                  {loading ? <span className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" /> : null}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <p className="text-xs tracking-ultra uppercase font-sans text-sand mb-6 font-medium">Find Us</p>
          <div className="aspect-[16/5] bg-cream-200 relative overflow-hidden border border-charcoal/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2158959999997!2d2.3029!3d48.8748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sRue%20du%20Faubourg%20Saint-Honor%C3%A9%2C%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="YS Studio Store Location"
            />
          </div>
        </div>
      </div>
    </div>
  )
}