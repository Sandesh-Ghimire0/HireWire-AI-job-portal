import api from './axios'

export const createJob = async (jobData) => {
  const response = await api.post('/v1/job', jobData)
  return response.data
}

export const getAllJobs = async () => {
  const response = await api.get('/v1/job')
  return response.data
}

export const getJobDescription = async (jobId) => {
  const response = await api.get(`/v1/job/description/${jobId}`)
  return response.data
}

export const getRecruiterJobs = async () => {
    const response = await api.get('/v1/job/my-jobs')
    return response.data
}


