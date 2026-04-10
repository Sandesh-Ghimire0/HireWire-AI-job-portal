import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [role, setRole] = useState('candidate')
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to backend
    navigate(role === 'candidate' ? '/candidate/dashboard' : '/recruiter/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#3d60a1] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-[#89a3d3] mb-2">Welcome Back</h2>
        <p className="text-gray-400 text-sm mb-6">Log in to your HireWire account</p>

        {/* Role Toggle */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          {['candidate', 'recruiter'].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition
                ${role === r ? 'bg-[#314f86] text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {r === 'candidate' ? 'Job Seeker' : 'Recruiter'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-600 font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}