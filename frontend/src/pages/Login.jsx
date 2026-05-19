import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, BrainCircuit, Eye, EyeOff } from 'lucide-react'
import useAuthStore from '../store/authstore'
import { loginUser } from '../api/auth'
import toast from 'react-hot-toast'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore(state => state.setAuth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await loginUser(form)
      const { user, accessToken } = response.data
      
      setAuth(user, accessToken)
      toast.success('Login successful!')

      // Navigate based on role
      if (user.role === 'CANDIDATE') {
        navigate('/candidate/dashboard')
      } else if (user.role === 'COMPANY') {
        navigate('/recruiter/dashboard')
      } else {
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel: branded ── */}
      <div className="hidden lg:flex w-1/2 bg-[#1A2B4A] flex-col justify-between p-12 relative overflow-hidden">

        {/* Background decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal-500/10 rounded-full" />
        <div className="absolute bottom-10 -right-16 w-96 h-96 bg-teal-400/10 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white/5 rounded-full" />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold text-teal-400">HireWire</Link>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <div className="w-14 h-14 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-6">
            <BrainCircuit size={30} className="text-teal-400" />
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Find your next<br />
            <span className="text-teal-400">opportunity</span><br />
            with AI.
          </h2>
          <p className="text-gray-400 text-base max-w-sm">
            HireWire matches your resume with the right roles using natural language processing — smarter than keyword search.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 flex gap-8">
          {[['500+', 'Active Jobs'], ['AI', 'Powered Match'], ['Fast', 'Hiring']].map(([val, label]) => (
            <div key={label}>
              <p className="text-teal-400 font-bold text-lg">{val}</p>
              <p className="text-gray-500 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="text-xl font-bold text-teal-500 lg:hidden block mb-8">HireWire</Link>

          <h2 className="text-3xl font-bold text-[#1A2B4A] mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-8">Log in to your account to continue</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
                <a href="#" className="text-xs text-teal-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex items-center justify-center gap-2 bg-[#1A2B4A] hover:bg-teal-600 text-white font-semibold py-3.5 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                <>Log In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-teal-600 font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}