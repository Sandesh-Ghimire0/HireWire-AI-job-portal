import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'

import CandidateDashboard from './pages/candidate/Dashboard'
import AllJobs from './pages/candidate/AllJobs'
import RecommendedJobs from './pages/candidate/RecommendedJobs'
import JobDetail from './pages/candidate/JobDetail'
import Resume from './pages/candidate/Resume'
import Applications from './pages/candidate/Applications'

import RecruiterDashboard from './pages/recruiter/Dashboard'
import PostJob from './pages/recruiter/PostJob'
import RecruiterJobs from './pages/recruiter/RecruiterJobs'
import JobApplications from './pages/recruiter/JobApplications'
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
        <Route path="/candidate/jobs" element={<Navigate to="/candidate/jobs/all" replace />} />
        <Route path="/candidate/jobs/all" element={<AllJobs />} />
        <Route path="/candidate/jobs/recommended" element={<RecommendedJobs />} />
        <Route path="/candidate/jobs/:id" element={<JobDetail />} />
        <Route path="/candidate/applications" element={<Applications />} />
        <Route path="/candidate/resume" element={<Resume />} />

        {/* Recruiter */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
        <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
        <Route path="/recruiter/jobs/:jobId/applications" element={<JobApplications />} />
        <Route path="/recruiter/applicants/:id" element={<Applicant />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App