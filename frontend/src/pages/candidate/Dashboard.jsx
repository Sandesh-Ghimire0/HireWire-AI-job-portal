import Sidebar from '../../components/common/Sidebar'
import AtsScore from '../../components/candidate/AtsScore'
import JobCard from '../../components/candidate/JobCard'
import SkillTag from '../../components/candidate/SkillTag'

const mockJobs = [
  { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Kathmandu', type: 'Full-time', posted: '2d ago', matchScore: 92, skills: ['React', 'Tailwind', 'JavaScript'] },
  { id: 2, title: 'UI/UX Designer', company: 'DesignHub', location: 'Remote', type: 'Part-time', posted: '1d ago', matchScore: 78, skills: ['Figma', 'CSS', 'Prototyping'] },
  { id: 3, title: 'React Developer', company: 'StartupX', location: 'Lalitpur', type: 'Full-time', posted: '3d ago', matchScore: 85, skills: ['React', 'Node.js', 'MongoDB'] },
]

const missingSkills = ['TypeScript', 'Next.js', 'Docker']
const matchedSkills = ['React', 'JavaScript', 'Tailwind CSS', 'Git']

export default function CandidateDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="candidate" />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-[#1A2B4A] mb-1">Welcome back, Bigyan 👋</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockJobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      </main>
    </div>
  )
}