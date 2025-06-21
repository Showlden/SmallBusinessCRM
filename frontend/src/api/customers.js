import axiosInstance from './index'

export const getCustomers = async (params = '') => {
    try {
        const response = await axiosInstance.get(`/customers/${params}`)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to fetch customers')
    }
}

export const getCustomer = async (id) => {
    try {
        const response = await axiosInstance.get(`/customers/${id}/`)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Customer not found')
    }
}

export const createCustomer = async (customerData) => {
    try {
        const response = await axiosInstance.post('/customers/', customerData)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ||
            Object.values(error.response?.data || {}).flat().join(', ') ||
            'Failed to create customer'
        )
    }
}

export const updateCustomer = async (id, customerData) => {
    try {
        const response = await axiosInstance.put(`/customers/${id}/`, customerData)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ||
            Object.values(error.response?.data || {}).flat().join(', ') ||
            'Failed to update customer'
        )
    }
}

export const deleteCustomer = async (id) => {
    try {
        await axiosInstance.delete(`/customers/${id}/`)
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to delete customer')
    }
}