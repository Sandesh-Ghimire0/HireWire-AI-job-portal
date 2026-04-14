import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/common/Sidebar'
import { Briefcase, Users, MapPin, DollarSign, Calendar, ChevronRight } from 'lucide-react'
import { getRecruiterJobs } from '../../api/job'
import toast from 'react-hot-toast'

export default function RecruiterJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const data = await getRecruiterJobs()
      setJobs(data.data)
    } catch (error) {
      toast.error('Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="recruiter" />

      <main className="flex-1 p-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1A2B4A]">Manage Jobs</h1>
            <p className="text-gray-400 text-sm">View and manage all your job postings.</p>
          </div>
          <Link
            to="/recruiter/post-job"
            className="inline-flex items-center gap-2 rounded-full bg-[#1A2B4A] px-6 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition"
          >
            Post new job
          </Link>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-gray-100">
            <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold text-[#1A2B4A]">No jobs posted yet</h2>
            <p className="text-gray-500 mb-6">Start by creating your first job opening.</p>
            <Link
              to="/recruiter/post-job"
              className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-6 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-100 transition"
            >
              Post a job now
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <h3 className="text-xl font-bold text-[#1A2B4A] group-hover:text-teal-600 transition-colors">
                        {job.title}
                      </h3>
                      <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                        {job.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-teal-500" />
                        {job.location || 'Remote'}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign size={16} className="text-teal-500" />
                        {job.salaryRange}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-teal-500" />
                        Posted on {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-2xl font-bold text-[#1A2B4A]">{job.applicantCount || 0}</p>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Applicants</p>
                    </div>
                    <Link
                      to={`/recruiter/jobs/${job._id}/applications`}
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-5 py-3 text-sm font-semibold text-[#1A2B4A] hover:bg-teal-50 hover:text-teal-700 transition-all border border-gray-100"
                    >
                      View Applicants
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-teal-500 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
