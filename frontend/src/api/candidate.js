import axios from './axios'

export const getCandidateProfile = async () => {
    const response = await axios.get('/v1/candidate/profile')
    return response.data
}
