import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Building2, 
  Sparkles, 
  MapPin, 
  UploadCloud, 
  FileText, 
  X,
  Globe,
  Briefcase,
  FileEdit
} from 'lucide-react'
import { registerCandidate, registerCompany, loginUser } from '../api/auth'
import useAuthStore from '../store/authstore'
import toast from 'react-hot-toast'

export default function Register() {
  const [role, setRole] = useState('candidate')
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '',
    location: '',
    cv: null,
    logo: null,
    website: '',
    industry: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore(state => state.setAuth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('email', form.email)
      formData.append('password', form.password)

      if (role === 'candidate') {
        if (!form.cv) {
          toast.error("Please upload your CV PDF file.")
          setLoading(false)
          return
        }
        formData.append('fullName', form.name)
        formData.append('cv', form.cv)

        // API call to candidate registration
        await registerCandidate(formData)
        toast.success("Account created successfully!")
      } else {
        if (!form.location) {
          toast.error("Please enter company location.")
          setLoading(false)
          return
        }
        formData.append('name', form.name)
        formData.append('location', form.location)
        formData.append('website', form.website)
        formData.append('industry', form.industry)
        formData.append('description', form.description)
        if (form.logo) {
          formData.append('logo', form.logo)
        }

        // API call to company registration
        await registerCompany(formData)
        toast.success("Company registered successfully!")
      }

      // Auto Login
      toast.loading("Logging you in...", { id: "login-toast" })
      const loginResponse = await loginUser({
        email: form.email,
        password: form.password
      })
      toast.dismiss("login-toast")

      const { user, accessToken } = loginResponse.data
      setAuth(user, accessToken)
      toast.success("Welcome to HireWire!")

      // Redirect based on role
      if (user.role === 'CANDIDATE') {
        navigate('/candidate/dashboard')
      } else if (user.role === 'COMPANY') {
        navigate('/recruiter/dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      toast.dismiss("login-toast")
      toast.error(err.response?.data?.message || err.message || "Registration failed")
    } finally {
      setLoading(false)
    }
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
        <div className="w-full max-w-md my-auto">

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
                type="button"
                onClick={() => {
                  setRole(key)
                  setForm({
                    name: '',
                    email: '',
                    password: '',
                    location: '',
                    cv: null,
                    logo: null,
                    website: '',
                    industry: '',
                    description: ''
                  })
                }}
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
                {role === 'recruiter' ? 'Company Name' : 'Full Name'} <span className="text-red-500">*</span>
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
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email <span className="text-red-500">*</span></label>
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
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password <span className="text-red-500">*</span></label>
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

            {/* Candidate CV Upload */}
            {role === 'candidate' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Upload Resume (CV PDF) <span className="text-red-500">*</span>
                </label>
                {!form.cv ? (
                  <div className="relative group border-2 border-dashed border-gray-200 hover:border-teal-400 rounded-xl transition duration-200 bg-white shadow-sm flex items-center justify-center p-6 text-center cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setForm({ ...form, cv: e.target.files[0] });
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    <div className="flex flex-col items-center gap-1.5 text-gray-400 group-hover:text-teal-500">
                      <UploadCloud size={24} className="transition-transform group-hover:-translate-y-0.5" />
                      <div>
                        <p className="text-xs font-semibold">Click to upload CV</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">PDF files only (Max 5MB)</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-teal-50/50 border border-teal-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText size={20} className="text-teal-500 shrink-0 animate-bounce" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#1A2B4A] truncate">{form.cv.name}</p>
                        <p className="text-[10px] text-slate-400">{(form.cv.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, cv: null })}
                      className="p-1 hover:bg-teal-100/50 rounded-full text-slate-400 hover:text-rose-500 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Recruiter Location & Website */}
            {role === 'recruiter' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Kathmandu, Nepal"
                      value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={form.website}
                      onChange={e => setForm({ ...form, website: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Recruiter Industry */}
            {role === 'recruiter' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Industry
                </label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. Information Technology, Healthcare"
                    value={form.industry}
                    onChange={e => setForm({ ...form, industry: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  />
                </div>
              </div>
            )}

            {/* Recruiter Description */}
            {role === 'recruiter' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Company Description
                </label>
                <div className="relative">
                  <FileEdit size={16} className="absolute left-3.5 top-3 text-gray-400" />
                  <textarea
                    placeholder="Tell us about your company and what you build..."
                    rows={3}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition resize-none"
                  />
                </div>
              </div>
            )}

            {/* Recruiter Logo Upload */}
            {role === 'recruiter' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Company Logo (Optional)
                </label>
                {!form.logo ? (
                  <div className="relative group border-2 border-dashed border-gray-200 hover:border-teal-400 rounded-xl transition duration-200 bg-white shadow-sm flex items-center justify-center p-6 text-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setForm({ ...form, logo: e.target.files[0] });
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-1.5 text-gray-400 group-hover:text-teal-500">
                      <UploadCloud size={24} className="transition-transform group-hover:-translate-y-0.5" />
                      <div>
                        <p className="text-xs font-semibold">Click to upload company logo</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, or WEBP</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-teal-50/50 border border-teal-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-teal-100 flex items-center justify-center shrink-0">
                        <img
                          src={URL.createObjectURL(form.logo)}
                          alt="logo preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#1A2B4A] truncate">{form.logo.name}</p>
                        <p className="text-[10px] text-slate-400">{(form.logo.size / 1024).toFixed(0)} KB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, logo: null })}
                      className="p-1 hover:bg-teal-100/50 rounded-full text-slate-400 hover:text-rose-500 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex items-center justify-center gap-2 bg-[#1A2B4A] hover:bg-teal-600 text-white font-semibold py-3.5 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
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
            className="block text-center border border-gray-200 bg-white hover:border-teal-400 hover:text-teal-600 text-gray-600 text-sm font-semibold py-3 rounded-xl transition shadow-sm"
          >
            Log In Instead
          </Link>
        </div>
      </div>
    </div>
  )
}