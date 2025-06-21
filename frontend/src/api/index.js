import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
})

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `JWT ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem('refreshToken')
                if (!refreshToken) throw new Error('No refresh token')

                const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
                    refresh: refreshToken
                })

                localStorage.setItem('token', response.data.access)
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            } catch (err) {
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
                return Promise.reject(err)
            }
        }

        // Unified error handling
        if (error.response) {
            // Server responded with error status (4xx, 5xx)
            const message = error.response.data?.detail ||
                Object.values(error.response.data || {}).flat().join(', ') ||
                'Request failed'
            return Promise.reject(new Error(message))
        } else if (error.request) {
            // Request was made but no response received
            return Promise.reject(new Error('Network error. Please check your connection.'))
        } else {
            // Something happened in setting up the request
            return Promise.reject(new Error('Request configuration error'))
        }
    }
)

export default axiosInstance