import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ role }) {
  const navigate = useNavigate()

  return (
    <nav className="w-full bg-[#1A2B4A]/80 backdrop-blur-md text-white px-8 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-teal-400 tracking-wide">
        HireWire
      </Link>

      {/* Nav Links */}
      <div className="flex gap-6 text-sm font-medium">
        {role === 'candidate' && (
          <>
            <Link to="/candidate/dashboard" className="hover:text-teal-400 transition">Dashboard</Link>
            <Link to="/candidate/jobs" className="hover:text-teal-400 transition">Jobs</Link>
            <Link to="/candidate/resume" className="hover:text-teal-400 transition">My Resume</Link>
          </>
        )}
        {role === 'recruiter' && (
          <>
            <Link to="/recruiter/dashboard" className="hover:text-teal-400 transition">Dashboard</Link>
            <Link to="/recruiter/post-job" className="hover:text-teal-400 transition">Post Job</Link>
          </>
        )}
        {!role && (
          <>
            <Link to="/login" className="hover:text-teal-400 transition">Login</Link>
            <Link to="/register" className="bg-teal-500 hover:bg-teal-600 px-4 py-1.5 rounded-full transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}