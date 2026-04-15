import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight, Building2, Sparkles } from 'lucide-react'

export default function Register() {
  const [role, setRole] = useState('candidate')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(role === 'candidate' ? '/candidate/dashboard' : '/recruiter/dashboard')
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel: branded ── */}
      <div className="hidden lg:flex w-1/2 bg-[#1A2B4A] flex-col justify-between p-12 relative overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-teal-500/10 rounded-full" />
        <div className="absolute bottom-0 -left-10 w-72 h-72 bg-teal-400/10 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/5 rounded-full" />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold text-teal-400">HireWire</Link>
        </div>

        {/* Center */}
        <div className="relative z-10">
          <div className="w-14 h-14 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-6">
            <Sparkles size={28} className="text-teal-400" />
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Join thousands<br />
            getting hired<br />
            <span className="text-teal-400">smarter.</span>
          </h2>
          <p className="text-gray-400 text-base max-w-sm">
            Whether you're looking for your next role or searching for the right talent — HireWire's AI has you covered.
          </p>

          {/* Role benefit cards */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <p className="text-white text-sm font-semibold">For Job Seekers</p>
              <p className="text-gray-400 text-xs mt-0.5">Get matched to jobs based on your actual skills, not just keywords.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <p className="text-white text-sm font-semibold">For Recruiters</p>
              <p className="text-gray-400 text-xs mt-0.5">Receive ranked, AI-scored candidates automatically — no manual filtering.</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-gray-500 text-xs">© 2026 HireWire · Samriddhi College</p>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="text-xl font-bold text-teal-500 lg:hidden block mb-8">HireWire</Link>

          <h2 className="text-3xl font-bold text-[#1A2B4A] mb-1">Create account</h2>
          <p className="text-gray-400 text-sm mb-6">Join HireWire and start your journey</p>

          {/* Role toggle */}
          <div className="flex bg-white border border-gray-200 rounded-xl p-1 mb-6 shadow-sm">
            {[
              { key: 'candidate', label: ' Job Seeker' },
              { key: 'recruiter', label: ' Recruiter' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setRole(key)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition
                  ${role === key
                    ? 'bg-[#1A2B4A] text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {role === 'recruiter' ? 'Company Name' : 'Full Name'}
              </label>
              <div className="relative">
                {role === 'recruiter'
                  ? <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  : <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                }
                <input
                  type="text"
                  placeholder={role === 'recruiter' ? 'e.g. Fuse Machine Pvt. Ltd.' : 'e.g. Bigyan Himalaya'}
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 bg-[#1A2B4A] hover:bg-teal-600 text-white font-semibold py-3.5 rounded-xl transition"
            >
              Create Account <ArrowRight size={16} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">already have an account?</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Link
            to="/login"
            className="block text-center border border-gray-200 bg-white hover:border-teal-400 hover:text-teal-600 text-gray-600 text-sm font-semibold py-3 rounded-xl transition"
          >
            Log In Instead
          </Link>
        </div>
      </div>
    </div>
  )
}