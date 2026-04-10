import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  role: null, // 'candidate' | 'recruiter'
  token: null,

  login: (user, role, token) => set({ user, role, token }),
  logout: () => set({ user: null, role: null, token: null }),
}))

export default useAuthStore