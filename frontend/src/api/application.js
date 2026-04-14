import axios from './axios'

export const submitApplication = async (applicationData) => {
    const response = await axios.post('/v1/application', applicationData)
    return response.data
}

export const getApplications = async () => {
    const response = await axios.get('/v1/application')
    return response.data
}

export const getJobApplications = async (jobId) => {
    const response = await axios.get(`/v1/application/job/${jobId}`)
    return response.data
}

export const getApplicationById = async (applicationId) => {
    const response = await axios.get(`/v1/application/${applicationId}`)
    return response.data
}

export const updateApplicationStatus = async (applicationId, status) => {
    const response = await axios.patch(`/v1/application/${applicationId}/status`, { status })
    return response.data
}
