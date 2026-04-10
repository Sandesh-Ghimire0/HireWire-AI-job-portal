import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [role, setRole] = useState('candidate')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(role === 'candidate' ? '/candidate/dashboard' : '/recruiter/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#3d60a1] flex items-center justify-center px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 my-8 ">
        <h2 className="text-2xl font-bold text-[#1b3463] mb-2">Create Account</h2>
        <p className="text-gray-400 text-sm mb-6">Join HireWire today</p>

        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          {['candidate', 'recruiter'].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition
                ${role === r ? 'bg-[#1A2B4A] text-white' : 'text-gray-500'}`}
            >
              {r === 'candidate' ? 'Job Seeker' : 'Recruiter'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={role === 'recruiter' ? 'Company Name' : 'Full Name'}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
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
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}