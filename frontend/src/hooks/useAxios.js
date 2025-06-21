import { useEffect, useState } from 'react'
import axiosInstance from '../api'

const useAxios = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(url)
                setData(response.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { data, loading, error }
}

export default useAxios