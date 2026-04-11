import { Link } from 'react-router-dom'
import { MapPin, Clock, Briefcase, DollarSign, Layers } from 'lucide-react'
import MatchScoreBadge from './MatchScoreBadge'
import { formatDistanceToNow } from 'date-fns'

export default function JobCard({ job }) {
  const company = job.companyId || {}

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
            ) : (
              <Briefcase className="text-gray-300" size={24} />
            )}
          </div>
          <div>
            <h3 className="font-bold text-[#1A2B4A] text-lg group-hover:text-teal-600 transition-colors">{job.title}</h3>
            <p className="text-sm text-gray-500 font-medium">{company.name || 'Unknown Company'}</p>
          </div>
        </div>
        <MatchScoreBadge score={job.matchScore || 0} />
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin size={14} className="text-teal-500" />
          <span>{company.location || 'Remote'}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Briefcase size={14} className="text-teal-500" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Layers size={14} className="text-teal-500" />
          <span>{job.level || 'Any Level'}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={14} className="text-teal-500" />
          <span>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-1 text-teal-600 font-semibold text-sm">
          <DollarSign size={14} />
          {job.salaryRange || 'Competitive'}
        </div>
        <Link
          to={`/candidate/jobs/${job._id}`}
          className="px-4 py-2 bg-[#1A2B4A] text-white text-xs font-bold rounded-xl hover:bg-teal-600 transition-colors"
        >
          Details
        </Link>
      </div>
    </div>
  )
}