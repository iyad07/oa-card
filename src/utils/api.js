import axios from 'axios'

// Use proxy in dev to avoid CORS; env base in production
const baseURL = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_BASE_URL || 'https://oa-vcard-2d56fb61c27d.herokuapp.com')

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Basic error passthrough (can expand later)
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

// --- Helpers per Backend API docs ---
export const requestOtp = (email) => api.post('/auth/request-otp', { email })

export const verifyOtp = async (email, otp) => {
  const { data } = await api.post('/auth/verify-otp', { email, otp })
  // Set default auth header for subsequent requests
  api.defaults.headers.common.Authorization = `Bearer ${data.token}`
  return data // { token, userId }
}

export const getUser = (id) => api.get(`/user/${id}`)
export const updateUser = (id, payload) => api.put(`/user/${id}`, payload)

// Public asset endpoints (png/vcard)
export const getQrPngUrl = (id) => `${baseURL}/user/${id}/qrcode`
export const getVcardUrl = (id) => `${baseURL}/user/${id}/vcard`

export default api