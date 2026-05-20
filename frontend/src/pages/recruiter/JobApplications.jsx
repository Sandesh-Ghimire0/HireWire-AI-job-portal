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
          <div className="overflow-x-auto rounded-3xl bg-white shadow-sm border border-gray-100">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-slate-50 border-b border-gray-100 text-xs uppercase text-gray-500 tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-5 font-semibold text-center w-16">Rank</th>
                  <th scope="col" className="px-6 py-5 font-semibold">Candidate</th>
                  <th scope="col" className="px-6 py-5 font-semibold">Contact</th>
                  <th scope="col" className="px-6 py-5 font-semibold">Match Score</th>
                  <th scope="col" className="px-6 py-5 font-semibold">Applied</th>
                  <th scope="col" className="px-6 py-5 font-semibold">Status</th>
                  <th scope="col" className="px-6 py-5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app, index) => (
                  <tr key={app._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-600 border border-teal-100 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                          <User size={20} />
                        </div>
                        <Link to={`/recruiter/applicants/${app._id}`} className="font-bold text-[#1A2B4A] hover:text-teal-600 transition-colors">
                          {app.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5 text-xs">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Mail size={13} className="text-teal-500" />
                          {app.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Phone size={13} className="text-teal-500" />
                          {app.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {app.matchScoreData ? (
                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
                          {app.matchScoreData.matchScore}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs font-medium">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold border tracking-wide ${getStatusStyle(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                          className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 cursor-pointer shadow-sm hover:border-gray-300 transition-colors"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="REVIEWING">Reviewing</option>
                          <option value="ACCEPTED">Accepted</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                        <Link 
                          to={`/recruiter/applicants/${app._id}`}
                          className="rounded-xl bg-[#1A2B4A] px-4 py-1.5 text-xs font-bold text-white hover:bg-teal-600 shadow-sm transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
