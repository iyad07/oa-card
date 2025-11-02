import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Example: attach token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    // Example error handling logic
    if (status === 401) {
      // handle unauthorized
      // e.g., redirect to login
    }
    return Promise.reject(error)
  }
)

// Sample API function
export const getUsers = async () => {
  const { data } = await api.get('/users')
  return data
}

export default api