import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Briefcase, Clock, ShieldCheck, Layers, Loader2 } from 'lucide-react'
import Sidebar from '../../components/common/Sidebar'
import MatchScoreBadge from '../../components/candidate/MatchScoreBadge'
import { getJobDescription } from '../../api/job'
import ReactMarkdown from 'react-markdown'
import { formatDistanceToNow } from 'date-fns'




export default function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobDescription(id)
        setJob(response.data)
      } catch (error) {
        console.error('Error fetching job details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])


  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="candidate" />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-teal-500" size={32} />
        </main>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="candidate" />
        <main className="flex-1 p-8">
          <div className="rounded-xl bg-white p-10 shadow-sm border border-gray-100">
            <h1 className="text-2xl font-semibold text-[#1A2B4A] mb-4">Job not found</h1>
            <p className="text-gray-500 mb-6">The job you are looking for does not exist or has been removed.</p>
            <Link to="/candidate/jobs" className="inline-flex items-center gap-2 rounded-lg bg-[#1A2B4A] px-4 py-2 text-white hover:bg-teal-600">
              <ArrowLeft size={16} /> Back to jobs
            </Link>
          </div>
        </main>
      </div>
    )
  }


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="candidate" />

      <main className="flex-1 p-8">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Link to="/candidate/jobs" className="inline-flex items-center gap-2 text-sm text-teal-500 hover:text-teal-700">
                <ArrowLeft size={16} /> Back to jobs
              </Link>
              <h1 className="mt-4 text-3xl font-bold text-[#1A2B4A]">{job.title}</h1>
              <p className="text-gray-500 mt-2">{job.companyId?.name} · {job.salaryRange || 'N/A'} · {job.type}</p>
            </div>
            <MatchScoreBadge score={job.matchScore || 0} />
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
            <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="inline-flex items-center gap-2"><MapPin size={16} /> {job.level || 'Any Level'}</span>
                <span className="inline-flex items-center gap-2"><Briefcase size={16} /> {job.type}</span>
                <span className="inline-flex items-center gap-2"><Clock size={16} /> {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>

              </div>

              <div className="space-y-6">
                <div>
                  <div className="prose text-gray-600 leading-relaxed">
                    <ReactMarkdown>
                      {job.markdownDescription || job.rawDescription}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </section>



            <aside className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-[#1A2B4A]">Why this role matters</h2>
                <p className="text-gray-600">Join a team that values strong UI craftsmanship and a meaningful user experience.</p>
              </div>

              <div className="rounded-3xl bg-teal-50 p-6">
                <div className="flex items-center gap-3 text-teal-700">
                  <ShieldCheck size={18} />
                  <span className="font-semibold">Application match</span>
                </div>
                <p className="mt-3 text-gray-700">Your resume match score is <strong>{job.matchScore}%</strong>. Keep your profile updated to improve this score.</p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="flex items-center gap-2 text-slate-700 font-medium mb-3">
                  <Layers size={18} /> Preferred skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* {job.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-700 border border-slate-200">
                      {skill}
                    </span>
                  ))} */}
                </div>
              </div>

              <Link
                to="/candidate/resume"
                className="block rounded-full bg-[#1A2B4A] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-teal-600"
              >
                Update resume
              </Link>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
