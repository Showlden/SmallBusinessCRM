import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'
import OrderList from '../components/orders/OrderList'
import { getOrders, deleteOrder } from '../api/orders'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id)
      setOrders(orders.filter(order => order.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <Spinner size="lg" />
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        {user && (
          <Link
            to="/orders/new"
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5" />
            Add Order
          </Link>
        )}
      </div>
      
      <OrderList orders={orders} onDelete={handleDelete} />
    </div>
  )
}

export default OrdersPage