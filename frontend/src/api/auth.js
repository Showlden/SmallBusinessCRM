import axiosInstance from './index'

export const registerUser = async (userData) => {
    const response = await axiosInstance.post('/auth/register/', userData)
    return response.data
}

export const loginUser = async (credentials) => {
    const response = await axiosInstance.post('/auth/login/', credentials)
    return response.data
}

export const refreshToken = async (refresh) => {
    const response = await axiosInstance.post('/auth/token/refresh/', { refresh })
    return response.data
}

export const getUserProfile = async () => {
    const response = await axiosInstance.get('/auth/profile/')
    return response.data
}