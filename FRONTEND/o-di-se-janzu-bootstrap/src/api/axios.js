import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

let accessToken = null

export function setAccessToken(token) {
  accessToken = token
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use((response) => response,
async (error) => {
  // double verrou flag once anti boucle
  const originalRequest = error.config
  if (error.response?.status === 401 && !originalRequest.once && !originalRequest.url.includes('/auth/refresh'))
  {
    originalRequest.once = true
    try {
      const { data } = await api.post('/auth/refresh', null, { withCredentials: true})
      accessToken = data.accessToken
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return api (originalRequest)
    } catch {
      accessToken = null
      window.location.href = '/login'
      return Promise.reject(error)
    }
  }
  return Promise.reject(error)
})

export default api