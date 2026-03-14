import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'

export default function AdminLogin() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, loginError } = useAdminAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600)) // brief delay feels more secure
    const ok = login(id, password)
    setLoading(false)
    if (ok) navigate('/admin', { replace: true })
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #C8A97E 0%, transparent 50%), radial-gradient(circle at 75% 75%, #C8A97E 0%, transparent 50%)' }} />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-display text-4xl font-light tracking-[0.3em] text-cream">YS Studio</span>
          <p className="text-xs tracking-ultra uppercase font-sans text-cream/30 mt-2">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-8">
          <h1 className="font-sans text-sm tracking-widest uppercase font-medium text-cream mb-8 text-center">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ID Field */}
            <div>
              <label className="block text-xs tracking-widest uppercase font-sans font-medium text-cream/50 mb-3">
                Admin ID
              </label>
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/20" />
                <input
                  type="text"
                  value={id}
                  onChange={e => setId(e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="Enter your ID"
                  className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-cream text-sm font-sans placeholder:text-cream/20 focus:outline-none focus:border-sand transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs tracking-widest uppercase font-sans font-medium text-cream/50 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/20" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full bg-white/5 border border-white/10 pl-10 pr-12 py-3 text-cream text-sm font-sans placeholder:text-cream/20 focus:outline-none focus:border-sand transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream/60 transition-colors">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {loginError && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3">
                <AlertCircle size={14} className="flex-shrink-0" />
                <p className="text-xs font-sans">{loginError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sand text-white py-3.5 text-xs tracking-widest uppercase font-sans font-medium hover:bg-sand-dark transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Verifying...</>
                : 'Access Dashboard'
              }
            </button>
          </form>
        </div>

        {/* Back to store link */}
        <div className="text-center mt-6">
          <a href="/" className="text-xs font-sans text-cream/20 hover:text-cream/40 transition-colors tracking-widest uppercase">
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  )
}