import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, FileText,
  PlusCircle, Users
} from 'lucide-react'

export default function Sidebar({ role }) {
  const location = useLocation()

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

  return (
    <aside className="w-60 min-h-screen bg-[#1A2B4A] text-white flex flex-col py-8 px-4">
      <h1 className="text-2xl font-bold text-teal-400 mb-10 px-2">HireWire</h1>
      <nav className="flex flex-col gap-2">
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
    </aside>
  )
}