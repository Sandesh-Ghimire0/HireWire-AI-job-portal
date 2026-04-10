import { useState } from 'react'
import { Search } from 'lucide-react'
import Sidebar from '../../components/common/Sidebar'
import JobCard from '../../components/candidate/JobCard'

const mockJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Kathmandu',
    type: 'Full-time',
    posted: '2d ago',
    matchScore: 92,
    skills: ['React', 'Tailwind', 'JavaScript'],
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'Remote',
    type: 'Part-time',
    posted: '1d ago',
    matchScore: 78,
    skills: ['Figma', 'CSS', 'Prototyping'],
  },
  {
    id: 3,
    title: 'React Developer',
    company: 'StartupX',
    location: 'Lalitpur',
    type: 'Full-time',
    posted: '3d ago',
    matchScore: 85,
    skills: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 4,
    title: 'Backend Engineer',
    company: 'ScaleLabs',
    location: 'Kathmandu',
    type: 'Remote',
    posted: '5d ago',
    matchScore: 81,
    skills: ['Node.js', 'Express', 'PostgreSQL'],
  },
]

export default function Jobs() {
  const [query, setQuery] = useState('')

  const filteredJobs = mockJobs.filter((job) => {
    const search = query.toLowerCase()
    return (
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search)
    )
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="candidate" />

      <main className="flex-1 p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1A2B4A]">Browse Jobs</h1>
            <p className="text-gray-400 text-sm">Find the right role for your skills and experience.</p>
          </div>
          <div className="w-full sm:w-80">
            <label className="relative block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs, company or location"
                className="w-full rounded-full border border-gray-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          {filteredJobs.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
              No jobs matched your search. Try another keyword.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
