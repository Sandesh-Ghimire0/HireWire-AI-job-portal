import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileText, Upload, CheckCircle, Trash2, Eye, Send } from 'lucide-react'
import Sidebar from '../../components/common/Sidebar'
import AtsScore from '../../components/candidate/AtsScore'
import SkillTag from '../../components/candidate/SkillTag'
import EasyApplyModal from '../../components/candidate/EasyApplyModal'

// Mock parsed resume data (replace with real API response)
const mockParsed = {
  name: 'john',
  email: 'john@example.com',
  phone: '+977 9800000000',
  skills: ['React.js', 'JavaScript', 'Tailwind CSS', 'Git', 'HTML', 'CSS'],
  education: 'BSc. CSIT —  College (2022–Present)',
  experience: 'Frontend Intern — TechStartup (2024)',
}

const mockMissingSkills = ['TypeScript', 'Next.js', 'Docker', 'Node.js']

// Mock job to apply for after upload
const mockJob = {
  id: 1,
  title: 'Frontend Developer',
  company: 'TechCorp Nepal',
  location: 'Kathmandu',
}

export default function Resume() {
  const [uploaded, setUploaded] = useState(false)
  const [fileName, setFileName] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return
    setFileName(file.name)
    setUploaded(true)
    setAnalyzing(true)
    setAnalyzed(false)

    // Simulate backend analysis delay
    setTimeout(() => {
      setAnalyzing(false)
      setAnalyzed(true)
    }, 2000)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  })

  const handleRemove = () => {
    setUploaded(false)
    setFileName('')
    setAnalyzed(false)
    setAnalyzing(false)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="candidate" />

      <main className="flex-1 p-8 max-w-4xl">
        <h1 className="text-2xl font-bold text-[#1A2B4A] mb-1">My Resume</h1>
        <p className="text-gray-400 text-sm mb-8">Upload your resume to get your ATS score and apply to jobs.</p>

        {/* Upload Zone */}
        {!uploaded ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center gap-3 cursor-pointer transition
              ${isDragActive
                ? 'border-teal-400 bg-teal-50'
                : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50/50 bg-white'}`}
          >
            <input {...getInputProps()} />
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <Upload size={28} className="text-teal-500" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-[#1A2B4A]">
                {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
              </p>
              <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
            </div>
            <span className="text-xs text-gray-300 bg-gray-100 px-3 py-1 rounded-full">PDF only · Max 5MB</span>
          </div>
        ) : (
          /* Uploaded File Card */
          <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center">
                <FileText size={22} className="text-red-500" />
              </div>
              <div>
                <p className="font-medium text-[#1A2B4A] text-sm">{fileName}</p>
                <p className="text-xs text-gray-400">
                  {analyzing ? (
                    <span className="text-teal-500 flex items-center gap-1">
                      <span className="animate-pulse">●</span> Analyzing resume...
                    </span>
                  ) : (
                    <span className="text-green-500 flex items-center gap-1">
                      <CheckCircle size={12} /> Analysis complete
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-gray-600">
                <Eye size={17} />
              </button>
              <button
                onClick={handleRemove}
                className="p-2 hover:bg-red-50 rounded-lg transition text-gray-400 hover:text-red-500"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analyzed && (
          <div className="mt-6 flex flex-col gap-6">

            {/* Score + Parsed Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <AtsScore score={74} />

              {/* Parsed Info */}
              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 col-span-2">
                <h3 className="font-semibold text-[#1A2B4A] mb-4 text-sm">Extracted Information</h3>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  {[
                    ['Name', mockParsed.name],
                    ['Email', mockParsed.email],
                    ['Phone', mockParsed.phone],
                    ['Education', mockParsed.education],
                    ['Experience', mockParsed.experience],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-[#1A2B4A] font-medium text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-semibold text-[#1A2B4A] mb-3 text-sm">Skills Found in Resume</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {mockParsed.skills.map(s => <SkillTag key={s} skill={s} matched={true} />)}
              </div>
              <h3 className="font-semibold text-[#1A2B4A] mb-3 text-sm">Suggested Skills to Add</h3>
              <div className="flex flex-wrap gap-2">
                {mockMissingSkills.map(s => <SkillTag key={s} skill={s} matched={false} />)}
              </div>
            </div>

            {/* ── Apply Button ── */}
            <div className="bg-gradient-to-r from-[#1A2B4A] to-[#0D3D56] rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-lg">Ready to Apply?</p>
                <p className="text-gray-300 text-sm mt-0.5">Your resume is analyzed. Apply to jobs with one click.</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-full transition shadow-lg hover:shadow-teal-500/30 hover:scale-105 active:scale-95"
              >
                <Send size={17} />
                Apply Now
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Easy Apply Modal */}
      {showModal && (
        <EasyApplyModal
          job={mockJob}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}