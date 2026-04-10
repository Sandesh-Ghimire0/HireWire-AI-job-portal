import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../components/common/Sidebar'
import { ArrowLeft, Mail, Briefcase, MapPin, Search } from 'lucide-react'

const applicants = [
  {
    id: 1,
    name: 'Anjali Sharma',
    role: 'Frontend Developer',
    company: 'ScaleLabs',
    location: 'Kathmandu',
    email: 'anjali.sharma@example.com',
    status: 'Interview scheduled',
    notes: 'Strong React experience and clean UI design sense.',
  },
  {
    id: 2,
    name: 'Rohan Thapa',
    role: 'Backend Engineer',
    company: 'TechCorp',
    location: 'Remote',
    email: 'rohan.thapa@example.com',
    status: 'Application received',
    notes: 'Excellent Node.js skills and solid API design experience.',
  },
]

export default function Applicant() {
  const { id } = useParams()
  const applicant = applicants.find((item) => String(item.id) === id)

  if (!applicant) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="recruiter" />
        <main className="flex-1 p-8">
          <div className="rounded-3xl bg-white p-10 shadow-sm border border-gray-100">
            <h1 className="text-2xl font-semibold text-[#1A2B4A] mb-4">Applicant not found</h1>
            <p className="text-gray-500 mb-6">Check the applicant ID or return to the applicants list.</p>
            <Link to="/recruiter/dashboard" className="inline-flex items-center gap-2 rounded-full bg-[#1A2B4A] px-4 py-2 text-white hover:bg-teal-600">
              <ArrowLeft size={16} /> Back to dashboard
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="recruiter" />

      <main className="flex-1 p-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1A2B4A]">Applicant details</h1>
            <p className="text-gray-400 text-sm">Review candidate info and next steps for this application.</p>
          </div>
          <Link to="/recruiter/dashboard" className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm text-teal-700 hover:bg-teal-100">
            <ArrowLeft size={16} /> Back to dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
            <div className="flex flex-wrap justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#1A2B4A]">{applicant.name}</h2>
                <p className="text-sm text-gray-500">Applied for {applicant.role}</p>
              </div>
              <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">{applicant.status}</span>
            </div>

            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-3">
                <Briefcase size={18} className="text-teal-500" />
                <span>{applicant.company}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-teal-500" />
                <span>{applicant.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-teal-500" />
                <span>{applicant.email}</span>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Hiring notes</h3>
              <p className="text-gray-600">{applicant.notes}</p>
            </div>
          </section>

          <aside className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="rounded-3xl bg-teal-50 p-6">
              <div className="flex items-center gap-3 text-teal-700 font-semibold mb-3">
                {/* <BriefcaseSearch size={18} /> Application overview */}
              </div>
              <p className="text-gray-600">Use this section to decide whether to move the candidate to the next interview round.</p>
            </div>

            <div className="rounded-3xl bg-white p-6 border border-gray-200">
              <h4 className="font-semibold text-slate-900 mb-3">Next action</h4>
              <button className="w-full rounded-full bg-[#1A2B4A] px-4 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition">
                Schedule interview
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
