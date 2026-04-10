import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/footer'

import { BrainCircuit, FileSearch, Trophy, Bell } from 'lucide-react'

const features = [
  { icon: FileSearch, title: 'Smart Resume Parsing', desc: 'AI extracts your skills, experience and education automatically.' },
  { icon: BrainCircuit, title: 'AI Job Matching', desc: 'NLP compares your profile with job requirements in seconds.' },
  { icon: Trophy, title: 'ATS Score', desc: 'Know exactly how well your resume matches before you apply.' },
  { icon: Bell, title: 'Instant Notifications', desc: 'Get alerted when you match a new job or get shortlisted.' },
]

const steps = [
  { step: '01', title: 'Upload Your Resume', desc: 'Upload your PDF resume and let AI do the reading.' },
  { step: '02', title: 'AI Analyzes & Matches', desc: 'Our NLP engine scores and matches you with relevant jobs.' },
  { step: '03', title: 'Get Hired', desc: 'Apply to best-matched jobs and track your applications.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 text-white py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Get Hired <span className="text-teal-400">Smarter</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
          HireWire uses AI to match your resume with the right jobs and helps recruiters find the right candidates — instantly.
        </p>
        <div className="flex justify-center gap-4">
  <Link
    to="/register"
    className="border border-white hover:bg-white hover:text-[#3565bd] px-6 py-3 rounded-full font-semibold transition"
  >
    Find Jobs
  </Link>

  <Link
    to="/register"
    className="border border-white hover:bg-white hover:text-[#3565bd] px-6 py-3 rounded-full font-semibold transition"
  >
    Post a Job
  </Link>
</div>
      </section>

      {/* Stats */}
      <section className="bg-teal-600 text-white py-8 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[['500+', 'Jobs Listed'], ['AI-Powered', 'Matching Engine'], ['Unbiased', 'Screening']].map(([val, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold">{val}</p>
              <p className="text-sm text-teal-100">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-[#1A2B4A] mb-12">How It Works</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-teal-500 text-white text-lg font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                {step}
              </div>
              <h3 className="font-semibold text-[#1A2B4A] mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8">
        <h2 className="text-3xl font-bold text-center text-[#1A2B4A] mb-12">Why HireWire?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition text-center">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-[#1A2B4A] mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}