import { Link } from 'react-router-dom'
import Footer from '../components/common/Footer'
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
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── Navbar ── */}
      <nav className="w-full bg-[#1A2B4A] px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-teal-400 tracking-wide">
          HireWire
        </Link>

        {/* Right side: nav links + auth buttons */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm text-gray-300 hover:text-white transition">Home</Link>
          <Link to="/candidate/jobs" className="text-sm text-gray-300 hover:text-white transition">Jobs</Link>

          {/* Divider */}
          <div className="w-px h-5 bg-white/20" />

          <Link
            to="/login"
            className="text-sm font-medium text-gray-200 hover:text-white transition"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold bg-teal-500 hover:bg-teal-400 text-white px-5 py-2 rounded-full transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      {/* Dark navy background — white text is fully readable */}
      <section className="bg-[#1A2B4A] text-white py-24 px-8 text-center">
        {/* Subtle badge */}
        <span className="inline-block bg-teal-500/20 text-teal-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          AI-Powered Recruitment
        </span>

        <h1 className="text-5xl font-bold mb-5 leading-tight">
          Get Hired <span className="text-teal-400">Smarter</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10">
          HireWire uses AI to match your resume with the right jobs and helps
          recruiters find the right candidates — instantly.
        </p>

        {/* CTA Buttons — clearly visible on dark bg */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="bg-teal-500 hover:bg-teal-400 text-white px-7 py-3 rounded-full font-semibold transition shadow-lg shadow-teal-500/20"
          >
            Find Jobs
          </Link>
          <Link
            to="/register"
            className="border border-white/40 hover:border-white hover:bg-white/10 text-white px-7 py-3 rounded-full font-semibold transition"
          >
            Post a Job
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-teal-600 text-white py-8 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            ['500+', 'Jobs Listed'],
            ['AI-Powered', 'Matching Engine'],
            ['Unbiased', 'Screening'],
          ].map(([val, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold">{val}</p>
              <p className="text-sm text-teal-100 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it Works ── */}
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

      {/* ── Features ── */}
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