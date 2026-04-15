import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Briefcase, MapPin, Clock, ChevronRight, 
  Search, Filter, Loader2, AlertCircle, 
  ExternalLink, Calendar
} from 'lucide-react'
import { format } from 'date-fns'
import Sidebar from '../../components/common/Sidebar'
import { getApplications } from '../../api/application'

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    REVIEWING: 'bg-blue-50 text-blue-600 border-blue-100',
    ACCEPTED: 'bg-green-50 text-green-600 border-green-100',
    REJECTED: 'bg-red-50 text-red-600 border-red-100',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || styles.PENDING}`}>
      {status}
    </span>
  )
}

export default function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications()
        if (response.success) {
          setApplications(response.data)
        } else {
          setError(response.message || "Failed to fetch applications")
        }
      } catch (err) {
        console.error("Error fetching applications:", err)
        setError("Something went wrong while loading your applications.")
      } finally {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar role="candidate" />
      
      <main className="flex-1 p-8">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1A2B4A] tracking-tight">My Applications</h1>
            <p className="text-gray-500 mt-2 font-medium">Track the status of your job applications</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search applications..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all w-64 shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Loader2 className="animate-spin text-teal-500 mb-4" size={40} />
            <p className="text-gray-500 font-medium animate-pulse">Loading your applications...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-sm">
            <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
            <h2 className="text-lg font-bold text-red-700 mb-2">Oops! something went wrong</h2>
            <p className="text-red-600/70 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="text-gray-300" size={32} />
            </div>
            <h2 className="text-xl font-bold text-[#1A2B4A] mb-2">No applications yet</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">You haven't applied to any jobs. Start your career journey today!</p>
            <Link 
              to="/candidate/jobs" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-teal-500 text-white rounded-full font-bold hover:bg-teal-600 transition shadow-lg shadow-teal-500/20"
            >
              Browse Jobs <ChevronRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {applications.map((app) => (
              <div 
                key={app._id}
                className="group relative bg-white border border-gray-100 rounded-[32px] p-6 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative flex flex-col sm:flex-row gap-5">
                  {/* Company Logo */}
                  <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    {app.jobId?.companyId?.logo ? (
                      <img src={app.jobId.companyId.logo} alt={app.jobId.companyId.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-teal-600">{app.jobId?.companyId?.name?.[0]}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-[#1A2B4A] group-hover:text-teal-600 transition-colors truncate pr-2">
                          {app.jobId?.title || 'Unknown Role'}
                        </h3>
                        <p className="text-sm font-semibold text-gray-500 flex items-center gap-1.5">
                          {app.jobId?.companyId?.name || 'Company Name'}
                        </p>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>

                    <div className="flex flex-wrap gap-y-3 gap-x-6 mt-4 pb-4 border-b border-gray-50">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                        <MapPin size={14} className="text-gray-300" />
                        {app.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                        <Calendar size={14} className="text-gray-300" />
                        Applied on {format(new Date(app.createdAt), 'MMM dd, yyyy')}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-1">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100" />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">Applied by 12 others</span>
                      </div>
                      
                      <Link 
                        to={`/candidate/jobs/${app.jobId?._id}`}
                        className="flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 transition"
                      >
                        View Details <ExternalLink size={14} />
                      </Link>
                    </div>
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
