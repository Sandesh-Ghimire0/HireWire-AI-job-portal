import { useState } from 'react'
import Sidebar from '../../components/common/Sidebar'
import AtsScore from '../../components/candidate/AtsScore'
import * as pdfjsLib from 'pdfjs-dist'

export default function Resume() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [atsScore, setAtsScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [resumeData, setResumeData] = useState({
    summary: '',
    skills: [],
    experience: [],
    education: [],
    contact: {},
  })
  const [atsBreakdown, setAtsBreakdown] = useState({
    technical: 0,
    soft: 0,
    formatting: 0,
  })

  // Enhanced keywords for ATS scoring with categories
  const keywordCategories = {
    technical: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Git', 'Figma', 'Node.js', 'TypeScript', 'Python', 'Java', 'SQL', 'MongoDB', 'AWS', 'Docker', 'REST API', 'GraphQL'],
    soft: ['Leadership', 'Communication', 'Team', 'Collaboration', 'Problem-solving', 'Management', 'Agile', 'Scrum', 'Project Management'],
  }

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === 'application/pdf') {
        setSelectedFile(file)
        setError('')
      } else {
        setError('Please upload a PDF file')
      }
    }
  }

  // Upload & scan the selected file
  const handleUploadAndScan = async () => {
    if (!selectedFile) {
      setError('Please select a PDF first.')
      return
    }
    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF resumes are supported.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const arrayBuffer = await selectedFile.arrayBuffer()
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise
      let text = ''
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items.map((item) => item.str).join(' ')
        text += pageText + ' '
      }

      setResumeText(text)
      extractResumeData(text)
    } catch (err) {
      setError('Failed to process PDF. Please try another file.')
      console.error('PDF processing error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Clear resume data
  const handleClear = () => {
    setSelectedFile(null)
    setResumeText('')
    setAtsScore(0)
    setResumeData({
      summary: '',
      skills: [],
      experience: [],
      education: [],
      contact: {},
    })
    setAtsBreakdown({
      technical: 0,
      soft: 0,
      formatting: 0,
    })
    setError('')
  }

  // Enhanced ATS scoring with breakdown
  const calculateATSScore = (text) => {
    const lowerText = text.toLowerCase()
    
    // Technical skills score (0-40 points)
    const technicalMatches = keywordCategories.technical.filter(kw => 
      lowerText.includes(kw.toLowerCase())
    )
    const technicalScore = Math.min((technicalMatches.length / keywordCategories.technical.length) * 40, 40)
    
    // Soft skills score (0-30 points)
    const softMatches = keywordCategories.soft.filter(kw => 
      lowerText.includes(kw.toLowerCase())
    )
    const softScore = Math.min((softMatches.length / keywordCategories.soft.length) * 30, 30)
    
    // Formatting score (0-30 points)
    let formattingScore = 0
    if (text.match(/@/)) formattingScore += 10 // Has email
    if (text.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/)) formattingScore += 10 // Has phone
    if (text.length > 500) formattingScore += 10 // Sufficient content
    
    const totalScore = Math.round(technicalScore + softScore + formattingScore)
    
    setAtsScore(totalScore)
    setAtsBreakdown({
      technical: Math.round(technicalScore),
      soft: Math.round(softScore),
      formatting: Math.round(formattingScore),
    })
  }

  // Get ATS suggestions
  const getATSSuggestions = () => {
    const suggestions = []
    if (atsBreakdown.technical < 20) {
      suggestions.push('Add more technical skills and tools relevant to your field')
    }
    if (atsBreakdown.soft < 15) {
      suggestions.push('Include soft skills like leadership, communication, or teamwork')
    }
    if (atsBreakdown.formatting < 20) {
      suggestions.push('Ensure your resume includes contact information (email, phone)')
    }
    if (atsScore < 50) {
      suggestions.push('Add more detailed descriptions of your experience and achievements')
    }
    return suggestions
  }

  // Extract contact information
  const extractContactInfo = (text) => {
    const contact = {}
    
    // Email
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/)
    if (emailMatch) contact.email = emailMatch[0]
    
    // Phone
    const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)
    if (phoneMatch) contact.phone = phoneMatch[0]
    
    // LinkedIn
    const linkedInMatch = text.match(/linkedin\.com\/in\/[\w-]+/)
    if (linkedInMatch) contact.linkedin = linkedInMatch[0]
    
    return contact
  }

  // Extract resume info
  const extractResumeData = (text) => {
    calculateATSScore(text)

    const allKeywords = [...keywordCategories.technical, ...keywordCategories.soft]
    const skills = allKeywords.filter((kw) => text.toLowerCase().includes(kw.toLowerCase()))

    // Experience extraction (improved)
    const expRegex = /([A-Z][a-zA-Z &,]+)\s*[-–|]\s*(\d{4}\s*[-–]\s*(?:\d{4}|Present|Current))/gi
    const experience = []
    let match
    const textLines = text.split('\n')
    
    while ((match = expRegex.exec(text)) !== null) {
      experience.push({
        company: match[1].trim(),
        period: match[2].trim(),
        title: 'Position extracted from resume',
        details: 'Relevant experience and achievements.',
      })
    }

    // Education extraction (improved)
    const eduRegex = /(BSc|MSc|BA|MA|MBA|PhD|Diploma|Bachelor|Master|Associate|B\.S\.|M\.S\.|B\.A\.|M\.A\.)[^\n\d]*([A-Za-z\s,&]+)?\s*[-–|]?\s*(\d{4}(?:\s*[-–]\s*(?:\d{4}|Present))?)/gi
    const education = []
    while ((match = eduRegex.exec(text)) !== null) {
      education.push({
        degree: match[1].trim(),
        school: match[2] ? match[2].trim() : 'Institution extracted from resume',
        period: match[3] ? match[3].trim() : 'Year not specified',
      })
    }

    const contact = extractContactInfo(text)

    setResumeData({
      summary: text.slice(0, 300).trim() + (text.length > 300 ? '...' : ''),
      skills,
      experience: experience.slice(0, 5), // Limit to 5 entries
      education: education.slice(0, 3), // Limit to 3 entries
      contact,
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="candidate" />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1A2B4A]">My Resume</h1>
            <p className="text-gray-600 text-sm mt-1">
              Upload your resume to automatically scan and optimize your profile for ATS systems.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-teal-50 to-blue-50 p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-[#1A2B4A] mb-4">Current ATS Score</h2>
            <AtsScore score={atsScore} />
            {atsScore > 0 && (
              <div className="mt-3 text-xs text-gray-600">
                <div className="flex justify-between mb-1">
                  <span>Technical Skills</span>
                  <span className="font-semibold">{atsBreakdown.technical}/40</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Soft Skills</span>
                  <span className="font-semibold">{atsBreakdown.soft}/30</span>
                </div>
                <div className="flex justify-between">
                  <span>Formatting</span>
                  <span className="font-semibold">{atsBreakdown.formatting}/30</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Upload section */}
        <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#1A2B4A]">Upload Resume</h2>
            {resumeText && (
              <button
                onClick={handleClear}
                className="text-sm text-gray-500 hover:text-red-600 transition font-medium"
              >
                Clear & Start Over
              </button>
            )}
          </div>

          {/* Drag and drop area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              dragActive
                ? 'border-teal-500 bg-teal-50'
                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
            }`}
          >
            <input
              type="file"
              id="resume-upload"
              accept="application/pdf"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setSelectedFile(e.target.files[0])
                  setError('')
                }
              }}
              className="hidden"
            />
            
            {!selectedFile ? (
              <label htmlFor="resume-upload" className="cursor-pointer">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-3"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-teal-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF files only (Max 10MB)</p>
              </label>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <svg className="h-8 w-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <label htmlFor="resume-upload">
                  <span className="ml-4 text-sm text-teal-600 hover:text-teal-700 cursor-pointer font-medium">
                    Change
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {selectedFile && !resumeText && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleUploadAndScan}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-full bg-[#1A2B4A] px-6 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Scan Resume
                  </>
                )}
              </button>
            </div>
          )}

          {/* Extracted summary */}
          {resumeText && (
            <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-[#1A2B4A] mb-2 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Extracted Summary
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{resumeData.summary}</p>
            </div>
          )}
        </section>

        {/* ATS Suggestions */}
        {resumeText && getATSSuggestions().length > 0 && (
          <section className="rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 p-6 shadow-sm border border-amber-200 mb-6">
            <h3 className="text-lg font-semibold text-[#1A2B4A] mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Suggestions to Improve Your Score
            </h3>
            <ul className="space-y-2">
              {getATSSuggestions().map((suggestion, index) => (
                <li key={index} className="flex items-start text-sm text-gray-700">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 mr-2 flex-shrink-0" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          {/* Sidebar info */}
          <aside className="space-y-6">
            {/* Contact Information */}
            {resumeData.contact && Object.keys(resumeData.contact).length > 0 && (
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-[#1A2B4A] mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {resumeData.contact.email && (
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{resumeData.contact.email}</span>
                    </div>
                  )}
                  {resumeData.contact.phone && (
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700">{resumeData.contact.phone}</span>
                    </div>
                  )}
                  {resumeData.contact.linkedin && (
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span className="text-gray-700 truncate">{resumeData.contact.linkedin}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {resumeData.skills.length > 0 && (
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-[#1A2B4A] mb-4">
                  Skills Detected ({resumeData.skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 px-3 py-1.5 text-sm font-medium text-teal-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resumeData.education.length > 0 && (
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-[#1A2B4A] mb-4">Education</h3>
                {resumeData.education.map((item, index) => (
                  <div key={index} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-b-0 border-gray-100">
                    <p className="font-semibold text-slate-900">{item.degree}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.school}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.period}</p>
                  </div>
                ))}
              </div>
            )}

            {!resumeText && (
              <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm border border-blue-200">
                <h3 className="text-lg font-semibold text-[#1A2B4A] mb-3">How it works</h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-600 text-white text-xs font-bold mr-2 flex-shrink-0 mt-0.5">1</span>
                    Upload your PDF resume
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-600 text-white text-xs font-bold mr-2 flex-shrink-0 mt-0.5">2</span>
                    We'll extract and analyze your content
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-600 text-white text-xs font-bold mr-2 flex-shrink-0 mt-0.5">3</span>
                    Get your ATS score and improvement tips
                  </li>
                </ol>
              </div>
            )}
          </aside>

          {/* Main experience section */}
          <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
            {resumeData.experience.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold text-[#1A2B4A] mb-6">Professional Experience</h3>
                <div className="space-y-6">
                  {resumeData.experience.map((item, index) => (
                    <div key={index} className="pb-6 last:pb-0 border-b last:border-b-0 border-gray-100">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-teal-600 mb-2">{item.company}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.details}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              !resumeText && (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No resume uploaded yet</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    Upload your resume to see your professional experience, skills, and get personalized ATS optimization suggestions.
                  </p>
                </div>
              )
            )}
          </section>
        </div>
      </main>
    </div>
  )
}


