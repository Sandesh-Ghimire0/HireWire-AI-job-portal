import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Sidebar from '../../components/common/Sidebar'
import { ArrowLeft, User, Mail, Phone, Calendar, CheckCircle, Clock, XCircle, MoreVertical } from 'lucide-react'
import { getJobApplications, updateApplicationStatus } from '../../api/application'
import toast from 'react-hot-toast'

export default function JobApplications() {
  const { jobId } = useParams()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [jobId])

  const fetchApplications = async () => {
    try {
      const data = await getJobApplications(jobId)
      setApplications(data.data)
    } catch (error) {
      toast.error('Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus)
      toast.success(`Status updated to ${newStatus}`)
      // Update local state
      setApplications(apps => 
        apps.map(app => app._id === applicationId ? { ...app, status: newStatus } : app)
      )
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'ACCEPTED': return 'bg-green-50 text-green-700 border-green-100'
      case 'REJECTED': return 'bg-red-50 text-red-700 border-red-100'
      case 'REVIEWING': return 'bg-blue-50 text-blue-700 border-blue-100'
      default: return 'bg-yellow-50 text-yellow-700 border-yellow-100'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="recruiter" />

      <main className="flex-1 p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/recruiter/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 transition-colors mb-2">
              <ArrowLeft size={16} /> Back to jobs
            </Link>
            <h1 className="text-2xl font-bold text-[#1A2B4A]">Applications</h1>
            <p className="text-gray-400 text-sm">Review candidates who applied for this position.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-gray-100">
            <Clock size={48} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold text-[#1A2B4A]">No applications yet</h2>
            <p className="text-gray-500">Applications will appear here once candidates start applying.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <User size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <Link to={`/recruiter/applicants/${app._id}`} className="text-lg font-bold text-[#1A2B4A] hover:text-teal-600 transition-colors">
                            {app.name}
                        </Link>
                        <span className={`rounded-full px-3 py-0.5 text-xs font-semibold border ${getStatusStyle(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail size={14} className="text-teal-500" />
                          {app.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={14} className="text-teal-500" />
                          {app.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-teal-500" />
                          Applied on {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t lg:border-t-0 pt-4 lg:pt-0">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-full lg:w-auto mb-2 lg:mb-0 lg:mr-2">
                        Update Status:
                    </span>
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                      className="rounded-xl border border-gray-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 cursor-pointer"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="REVIEWING">Reviewing</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                    
                    <Link 
                        to={`/recruiter/applicants/${app._id}`}
                        className="rounded-xl bg-[#1A2B4A] px-5 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
                    >
                        View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
