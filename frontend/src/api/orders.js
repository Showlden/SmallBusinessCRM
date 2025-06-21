import axiosInstance from './index'

export const getOrders = async (params = '') => {
    try {
        const response = await axiosInstance.get(`/orders/${params}`)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to fetch orders')
    }
}

export const getOrder = async (id) => {
    try {
        const response = await axiosInstance.get(`/orders/${id}/`)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Order not found')
    }
}

export const createOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post('/orders/', orderData)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ||
            Object.values(error.response?.data || {}).flat().join(', ') ||
            'Failed to create order'
        )
    }
}

export const updateOrder = async (id, orderData) => {
    try {
        const response = await axiosInstance.put(`/orders/${id}/`, orderData)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ||
            Object.values(error.response?.data || {}).flat().join(', ') ||
            'Failed to update order'
        )
    }
}

export const deleteOrder = async (id) => {
    try {
        await axiosInstance.delete(`/orders/${id}/`)
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to delete order')
    }
}