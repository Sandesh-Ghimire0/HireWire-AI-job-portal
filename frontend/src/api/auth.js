import api from './axios'

export const loginUser = async (credentials) => {
  const response = await api.post('/v1/auth/login', credentials)
  return response.data
}
