import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'

import CandidateDashboard from './pages/candidate/Dashboard'
import Jobs from './pages/candidate/Jobs'
import JobDetail from './pages/candidate/JobDetail'
import Resume from './pages/candidate/Resume'

import RecruiterDashboard from './pages/recruiter/Dashboard'
import PostJob from './pages/recruiter/PostJob'
import Applicant from './pages/recruiter/Applicant'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Candidate */}
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate/jobs" element={<Jobs />} />
        <Route path="/candidate/jobs/:id" element={<JobDetail />} />
        <Route path="/candidate/resume" element={<Resume />} />

        {/* Recruiter */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
        <Route path="/recruiter/applicants/:id" element={<Applicant />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App