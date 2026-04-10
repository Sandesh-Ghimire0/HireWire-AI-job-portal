import { Link } from 'react-router-dom'
import { MapPin, Clock, Briefcase } from 'lucide-react'
import MatchScoreBadge from './MatchScoreBadge'

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-[#1A2B4A] text-base">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
        <MatchScoreBadge score={job.matchScore} />
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
        <span className="flex items-center gap-1"><Briefcase size={12} /> {job.type}</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {job.posted}</span>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {job.skills?.slice(0, 3).map(skill => (
          <span key={skill} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>

      <Link
        to={`/candidate/jobs/${job.id}`}
        className="block text-center bg-[#1A2B4A] text-white text-sm py-2 rounded-lg hover:bg-teal-600 transition"
      >
        View Job
      </Link>
    </div>
  )
}