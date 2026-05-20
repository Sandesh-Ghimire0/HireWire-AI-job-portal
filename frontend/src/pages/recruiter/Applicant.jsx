import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../components/common/Sidebar'
import { ArrowLeft, Mail, Briefcase, MapPin, User, Phone, Calendar, Download } from 'lucide-react'
import { getApplicationById, updateApplicationStatus } from '../../api/application'
import toast from 'react-hot-toast'

export default function Applicant() {
  const { id } = useParams()
  const [applicant, setApplicant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchApplicant()
  }, [id])

  const fetchApplicant = async () => {
    try {
      const data = await getApplicationById(id)
      setApplicant(data.data)
    } catch (error) {
      toast.error('Failed to fetch applicant details')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus) => {
    setUpdating(true)
    try {
      await updateApplicationStatus(id, newStatus)
      setApplicant(prev => ({ ...prev, status: newStatus }))
      toast.success(`Status updated to ${newStatus}`)
    } catch (error) {
      toast.error('Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  console.log(applicant)

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 uppercase tracking-tighter">
        <Sidebar role="recruiter" />
        <main className="flex-1 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
        </main>
      </div>
    )
  }

  if (!applicant) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="recruiter" />
        <main className="flex-1 p-8">
          <div className="rounded-3xl bg-white p-10 shadow-sm border border-gray-100">
            <h1 className="text-2xl font-semibold text-[#1A2B4A] mb-4">Applicant not found</h1>
            <p className="text-gray-500 mb-6">Check the applicant ID or return to the dashboard.</p>
            <Link to="/recruiter/jobs" className="inline-flex items-center gap-2 rounded-full bg-[#1A2B4A] px-4 py-2 text-white hover:bg-teal-600">
              <ArrowLeft size={16} /> Back to jobs
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
            <p className="text-gray-400 text-sm">Review candidate info and manage their application status.</p>
          </div>
          <Link to={`/recruiter/jobs/${applicant.jobId?._id || applicant.jobId}/applications`} className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm text-teal-700 hover:bg-teal-100">
            <ArrowLeft size={16} /> Back to applicant list
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
            <div className="flex flex-wrap justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#1A2B4A] uppercase">{applicant.name}</h2>
                <p className="text-sm text-gray-400 mt-1">Applied for <span className="text-[#1A2B4A] font-semibold">{applicant.jobId?.title || 'this position'}</span></p>
              </div>
              <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 ring-1 ring-teal-100">
                {applicant.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 text-gray-600 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Mail size={18} className="text-teal-500" />
                    <span>{applicant.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone size={18} className="text-teal-500" />
                    <span>{applicant.phone}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-teal-500" />
                    <span>{applicant.location}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-teal-500" />
                    <span>Applied on {new Date(applicant.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Briefcase size={18} className="text-teal-600" /> Professional Experience
                    </h3>
                    <div className="text-sm text-gray-600 space-y-2">
                        <p><span className="font-medium">Total Experience:</span> {applicant.experience}</p>
                        {applicant.lastTitle && <p><span className="font-medium">Last Position:</span> {applicant.lastTitle}</p>}
                        {applicant.notice && <p><span className="font-medium">Notice Period:</span> {applicant.notice}</p>}
                        {applicant.salary && <p><span className="font-medium">Expected Salary:</span> {applicant.salary}</p>}
                    </div>
                </div>

                {applicant.coverLetter && (
                    <div className="rounded-3xl bg-white p-6 border border-gray-100 italic text-gray-500 text-sm italic">
                        <h3 className="font-semibold text-slate-900 mb-3 not-italic">Cover Letter</h3>
                        "{applicant.coverLetter}"
                    </div>
                )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-slate-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button 
                  onClick={() => handleStatusChange('ACCEPTED')}
                  disabled={updating || applicant.status === 'ACCEPTED'}
                  className="w-full rounded-2xl bg-teal-500 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition disabled:opacity-50"
                >
                  Mark as Accepted
                </button>
                <button 
                  onClick={() => handleStatusChange('REJECTED')}
                  disabled={updating || applicant.status === 'REJECTED'}
                  className="w-full rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                >
                  Mark as Rejected
                </button>
                <button 
                  onClick={() => handleStatusChange('REVIEWING')}
                  disabled={updating || applicant.status === 'REVIEWING'}
                  className="w-full rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-100 transition disabled:opacity-50"
                >
                  Move to Reviewing
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-slate-900 mb-4">Resume</h4>
              {applicant.candidateId?.cvLink ? (
                  <button 
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1A2B4A] px-4 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition"
                    onClick={() => window.open(applicant.candidateId.cvLink, '_blank', 'noopener,noreferrer')}
                  >
                    View CV
                  </button>
              ) : (
                  <button 
                    disabled
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-400 transition cursor-not-allowed"
                  >
                    No CV Uploaded
                  </button>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
