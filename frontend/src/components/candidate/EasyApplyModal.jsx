import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { X, ChevronRight, ChevronLeft, CheckCircle, Upload, User, Phone, Mail, MapPin, Briefcase, FileText, Loader2 } from 'lucide-react'
import { getCandidateProfile } from '../../api/candidate'
import { submitApplication } from '../../api/application'

// ─── Step Components ──────────────────────────────────────────────────────────

function StepContact({ data, onChange }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-[#1A2B4A] text-sm uppercase tracking-wide">Contact Information</h3>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Full Name *</label>
        <div className="relative">
          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={data.name}
            onChange={e => onChange({ ...data, name: e.target.value })}
            placeholder="full name"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Email Address *</label>
        <div className="relative">
          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={data.email}
            onChange={e => onChange({ ...data, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs font-medium text-gray-500">Phone Number *</label>
          <div className="relative">
            <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={data.phone}
              onChange={e => onChange({ ...data, phone: e.target.value })}
              placeholder="+977 98XXXXXXXX"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs font-medium text-gray-500">Location *</label>
          <div className="relative">
            <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={data.location}
              onChange={e => onChange({ ...data, location: e.target.value })}
              placeholder="Kathmandu, Nepal"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StepExperience({ data, onChange }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-[#1A2B4A] text-sm uppercase tracking-wide">Experience & Availability</h3>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Years of Experience *</label>
        <div className="relative">
          <Briefcase size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={data.experience}
            onChange={e => onChange({ ...data, experience: e.target.value })}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white appearance-none"
          >
            <option value="">Select experience level</option>
            <option>Fresher (0 years)</option>
            <option>1 year</option>
            <option>2 years</option>
            <option>3–5 years</option>
            <option>5+ years</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Current / Last Job Title</label>
        <input
          type="text"
          value={data.lastTitle}
          onChange={e => onChange({ ...data, lastTitle: e.target.value })}
          placeholder="e.g. Frontend Developer Intern"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Notice Period / Availability</label>
        <select
          value={data.notice}
          onChange={e => onChange({ ...data, notice: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white appearance-none"
        >
          <option value="">Select notice period</option>
          <option>Immediately Available</option>
          <option>1 week</option>
          <option>2 weeks</option>
          <option>1 month</option>
          <option>More than 1 month</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Expected Salary (NPR / month)</label>
        <input
          type="text"
          value={data.salary}
          onChange={e => onChange({ ...data, salary: e.target.value })}
          placeholder="e.g. 30,000"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>
    </div>
  )
}

function StepResume({ data, onChange, existingCv }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) onChange({ ...data, file, fileName: file.name })
  }

  const getDisplayName = () => {
    if (data.fileName) return data.fileName
    if (existingCv) return "Current Resume (click to view)"
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-[#1A2B4A] text-sm uppercase tracking-wide">Resume & Cover Letter</h3>

      {/* Resume Upload / Display */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Resume (PDF) *</label>

        {existingCv && !data.file ? (
          <div className="flex flex-col gap-3">
            <a
              href={existingCv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-teal-200 bg-teal-50 rounded-xl hover:bg-teal-100 transition group"
            >
              <div className="bg-teal-500 p-2 rounded-lg text-white group-hover:scale-110 transition">
                <FileText size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-teal-700 truncate">Current Resume</p>
                <p className="text-xs text-teal-600/70">Click to open in new tab</p>
              </div>
              <ChevronRight size={18} className="text-teal-400" />
            </a>

            {/* <label className="text-xs font-medium text-gray-400 text-center">OR</label>
            
            <label className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 transition">
              <Upload size={18} className="text-gray-400" />
              <span className="text-xs text-gray-500">Upload new resume to replace</span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label> */}
          </div>
        ) : (
          <label className="border-2 border-dashed border-teal-300 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-teal-50 transition">
            <Upload size={24} className="text-teal-500" />
            <span className="text-sm text-gray-500">
              {data.fileName ? (
                <span className="text-teal-600 font-medium">{data.fileName}</span>
              ) : (
                <>Click to upload or drag & drop</>
              )}
            </span>
            <span className="text-xs text-gray-400">PDF only, max 5MB</span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* ATS Score Preview */}
      {data.file && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-teal-700 font-medium">ATS Match Score</span>
          <span className="text-lg font-bold text-teal-600">74%</span>
        </div>
      )}

      {/* Cover Letter */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Cover Letter (optional)</label>
        <textarea
          value={data.coverLetter}
          onChange={e => onChange({ ...data, coverLetter: e.target.value })}
          placeholder="Write a brief cover letter explaining why you're a great fit..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
        />
      </div>
    </div>
  )
}

function StepSuccess({ jobTitle, company }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
        <CheckCircle size={36} className="text-teal-500" />
      </div>
      <h3 className="text-xl font-bold text-[#1A2B4A]">Application Submitted!</h3>
      <p className="text-gray-500 text-sm max-w-xs">
        Your application for <span className="font-semibold text-[#1A2B4A]">{jobTitle}</span> at{' '}
        <span className="font-semibold text-[#1A2B4A]">{company}</span> has been sent successfully.
      </p>
      <div className="bg-gray-50 rounded-lg px-4 py-3 text-xs text-gray-400 text-left w-full mt-2">
        <p>✅ Resume uploaded and analyzed</p>
        <p>✅ ATS score calculated</p>
        <p>✅ Recruiter notified via email</p>
      </div>
    </div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }) {
  const steps = ['Contact', 'Experience', 'Resume', 'Review']
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
              ${i < current ? 'bg-teal-500 text-white' :
                i === current ? 'bg-[#1A2B4A] text-white ring-2 ring-teal-400 ring-offset-1' :
                  'bg-gray-200 text-gray-400'}`}
            >
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] font-medium whitespace-nowrap
              ${i === current ? 'text-[#1A2B4A]' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-0.5 flex-1 mx-1 mb-4 transition-all duration-300
              ${i < current ? 'bg-teal-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function EasyApplyModal({ job, onClose }) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', location: '' })
  const [expData, setExpData] = useState({ experience: '', lastTitle: '', notice: '', salary: '' })
  const [resumeData, setResumeData] = useState({ file: null, fileName: '', coverLetter: '' })
  const [existingCv, setExistingCv] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCandidateProfile()
        if (response.success && response.data) {
          const profile = response.data
          setContactData(prev => ({
            ...prev,
            name: profile.fullName || '',
            // Email might be in profile.userId.email if populated, 
            // but let's assume it's available or leave as is if not.
            email: profile.userId?.email || prev.email || ''
          }))
          setExistingCv(profile.cvLink)
        }
      } catch (error) {
        console.error("Failed to fetch candidate profile:", error)
      }
    }
    fetchProfile()
  }, [])

  const totalSteps = 3

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(s => s + 1)
    else handleSubmit()
  }

  const { id: jobIdFromUrl } = useParams()

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const payload = {
        jobId: job?._id || jobIdFromUrl,
        ...contactData,
        ...expData,
        coverLetter: resumeData.coverLetter
      }

      const response = await submitApplication(payload)
      if (response.success) {
        setSubmitted(true)
      } else {
        setError(response.message || "Something went wrong. Please try again.")
      }
    } catch (err) {
      console.error("Application submission error:", err)
      setError(err.response?.data?.message || "Failed to submit application. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    if (step === 0) return contactData.name && contactData.email && contactData.phone && contactData.location
    if (step === 1) return expData.experience
    if (step === 2) return resumeData.file !== null || existingCv !== null
    return true
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in">

        {/* Header */}
        <div className="bg-[#1A2B4A] px-6 py-4 flex items-start justify-between shrink-0">
          <div>
            <p className="text-teal-400 text-xs font-semibold uppercase tracking-widest mb-0.5">Easy Apply</p>
            <h2 className="text-white font-bold text-lg leading-tight">{job?.title}</h2>
            <p className="text-gray-300 text-sm">{job?.company} · {job?.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition mt-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!submitted ? (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}
              <ProgressBar current={step} total={totalSteps} />
              {step === 0 && <StepContact data={contactData} onChange={setContactData} />}
              {step === 1 && <StepExperience data={expData} onChange={setExpData} />}
              {step === 2 && <StepResume data={resumeData} onChange={setResumeData} existingCv={existingCv} />}
            </>
          ) : (
            <StepSuccess jobTitle={job?.title} company={job?.company} />
          )}
        </div>

        {/* Footer */}
        {!submitted ? (
          <div className="border-t border-gray-100 px-6 py-4 flex justify-between items-center shrink-0 bg-white">
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <span className="text-xs text-gray-300">Step {step + 1} of {totalSteps}</span>
            <button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  {step === totalSteps - 1 ? 'Submit Application' : 'Next'}
                  {step < totalSteps - 1 && <ChevronRight size={16} />}
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="border-t border-gray-100 px-6 py-4 shrink-0 bg-white">
            <button
              onClick={onClose}
              className="w-full bg-[#1A2B4A] hover:bg-teal-600 text-white font-semibold py-3 rounded-full transition text-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}