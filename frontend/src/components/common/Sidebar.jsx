import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, FileText,
  PlusCircle, Users, LogOut
} from 'lucide-react'

export default function Sidebar({ role }) {
  const location = useLocation()
  const navigate = useNavigate()

  const candidateLinks = [
    { to: '/candidate/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/candidate/jobs', label: 'Browse Jobs', icon: Briefcase },
    { to: '/candidate/resume', label: 'My Resume', icon: FileText },
  ]

  const recruiterLinks = [
    { to: '/recruiter/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/recruiter/post-job', label: 'Post a Job', icon: PlusCircle },
    { to: '/recruiter/applicants/1', label: 'Applicants', icon: Users },
  ]

  const links = role === 'recruiter' ? recruiterLinks : candidateLinks

  const handleLogout = () => {
    // Clear auth state here (localStorage, zustand store, etc.)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    // sticky top-0 h-screen keeps sidebar fixed while page scrolls
    <aside className="sticky top-0 h-screen w-60 bg-[#1A2B4A] text-white flex flex-col py-8 px-4 shrink-0">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-teal-400 mb-10 px-2">HireWire</h1>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
              ${location.pathname === to
                ? 'bg-teal-600 text-white'
                : 'hover:bg-white/10 text-gray-300'}`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout Button — pinned to bottom */}
      <div className="border-t border-white/10 pt-4 mt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}