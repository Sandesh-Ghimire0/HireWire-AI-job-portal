import { useState } from 'react'
import Sidebar from '../../components/common/Sidebar'
import { PlusCircle } from 'lucide-react'

export default function PostJob() {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="recruiter" />

      <main className="flex-1 p-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1A2B4A]">Post a job</h1>
            <p className="text-gray-400 text-sm">Create a new job listing for candidates to apply.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm text-teal-700">
            <PlusCircle size={18} /> New opening
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Job title</span>
              <input
                value={form.title}
                onChange={handleChange('title')}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                placeholder="e.g. Senior UX Designer"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Company</span>
              <input
                value={form.company}
                onChange={handleChange('company')}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                placeholder="e.g. TalentHive"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Location</span>
              <input
                value={form.location}
                onChange={handleChange('location')}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                placeholder="e.g. Kathmandu"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Type</span>
              <select
                value={form.type}
                onChange={handleChange('type')}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Job description</span>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              rows={6}
              className="mt-2 w-full rounded-3xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              placeholder="Write a short description for this role"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[#1A2B4A] px-6 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition"
          >
            Post job
          </button>

          {submitted && (
            <p className="rounded-2xl bg-teal-50 p-4 text-sm text-teal-700">Your job was saved locally. Connect this form to your backend to persist listings.</p>
          )}
        </form>
      </main>
    </div>
  )
}
