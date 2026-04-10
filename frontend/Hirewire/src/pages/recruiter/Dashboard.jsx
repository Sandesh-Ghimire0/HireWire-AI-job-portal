import Sidebar from '../../components/common/Sidebar'
import { Briefcase, Users, FileText } from 'lucide-react'

const postedJobs = [
  { id: 1, title: 'Senior Backend Engineer', company: 'ScaleLabs', applicants: 18, status: 'Open' },
  { id: 2, title: 'Product Designer', company: 'DesignHub', applicants: 12, status: 'Open' },
  { id: 3, title: 'Recruitment Lead', company: 'TalentHive', applicants: 9, status: 'Interviewing' },
]

export default function RecruiterDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="recruiter" />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A2B4A]">Recruiter dashboard</h1>
          <p className="text-gray-400 text-sm">Manage your jobs, track applicants, and review candidate matches.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[#1A2B4A]">Open roles</span>
              <Briefcase size={20} className="text-teal-500" />
            </div>
            <p className="text-3xl font-bold text-[#1A2B4A]">8</p>
            <p className="text-sm text-gray-500">Active job postings</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[#1A2B4A]">Applicants</span>
              <Users size={20} className="text-teal-500" />
            </div>
            <p className="text-3xl font-bold text-[#1A2B4A]">142</p>
            <p className="text-sm text-gray-500">Candidates in review</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[#1A2B4A]">Resume quality</span>
              <FileText size={20} className="text-teal-500" />
            </div>
            <p className="text-3xl font-bold text-[#1A2B4A]">78%</p>
            <p className="text-sm text-gray-500">Average candidate match score</p>
          </div>
        </div>

        <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1A2B4A]">Recently posted jobs</h2>
              <p className="text-gray-500 text-sm">Review the latest openings and applicant counts.</p>
            </div>
          </div>

          <div className="space-y-4">
            {postedJobs.map((job) => (
              <div key={job.id} className="flex flex-col gap-2 rounded-3xl border border-gray-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[#1A2B4A]">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span>{job.applicants} applicants</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">{job.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
