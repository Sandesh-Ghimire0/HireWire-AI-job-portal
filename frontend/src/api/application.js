import axios from './axios'

export const submitApplication = async (applicationData) => {
    const response = await axios.post('/v1/application', applicationData)
    return response.data
}

export const getApplications = async () => {
    const response = await axios.get('/v1/application')
    return response.data
}
