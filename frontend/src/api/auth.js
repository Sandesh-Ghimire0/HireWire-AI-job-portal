import api from './axios'

export const loginUser = async (credentials) => {
  const response = await api.post('/v1/auth/login', credentials)
  return response.data
}

export const registerCandidate = async (formData) => {
  const response = await api.post('/v1/candidate/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const registerCompany = async (formData) => {
  const response = await api.post('/v1/company/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
