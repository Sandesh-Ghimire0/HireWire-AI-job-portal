import { useEffect, useState } from 'react'
import Sidebar from '../../components/common/Sidebar'
import AtsScore from '../../components/candidate/AtsScore'
import JobCard from '../../components/candidate/JobCard'
import SkillTag from '../../components/candidate/SkillTag'
import { useAuthStore } from '../../store/authstore'
import { getAllJobs } from '../../api/job'
import { Loader2 } from 'lucide-react'

const missingSkills = ['TypeScript', 'Next.js', 'Docker']
const matchedSkills = ['React', 'JavaScript', 'Tailwind CSS', 'Git']

export default function CandidateDashboard() {
  const { user } = useAuthStore()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs()
        setJobs(response.data.slice(0, 3)) // Show only 3 recommended jobs
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="candidate" />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-[#1A2B4A] mb-1">Welcome back, {user?.fullName || user?.name || 'Candidate'} 👋</h1>
        <p className="text-gray-400 text-sm mb-8">Here's your job matching summary for today.</p>

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AtsScore score={74} />

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 col-span-2">
            <h3 className="font-semibold text-[#1A2B4A] mb-4">Skill Analysis</h3>
            <p className="text-xs text-gray-400 mb-2">Matched Skills</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {matchedSkills.map(s => <SkillTag key={s} skill={s} matched={true} />)}
            </div>
            <p className="text-xs text-gray-400 mb-2">Missing Skills</p>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map(s => <SkillTag key={s} skill={s} matched={false} />)}
            </div>
          </div>
        </div>

        {/* Recommended Jobs */}
        <h2 className="text-lg font-semibold text-[#1A2B4A] mb-4">Recommended Jobs</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-teal-500" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map(job => <JobCard key={job._id} job={job} />)}
            {jobs.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-10">No recommended jobs found.</p>
            )}
          </div>
        )}
      </main>

    </div>
  )
}