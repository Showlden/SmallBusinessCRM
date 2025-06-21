import { useParams, Link } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import OrderView from '../components/orders/OrderView'
import Spinner from '../components/Spinner'
import { PencilIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const OrderDetailPage = () => {
  const { id } = useParams()
  const { data: order, loading, error } = useAxios(`/orders/${id}/`)

  if (loading) return <Spinner size="lg" />
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link
          to="/orders"
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Orders
        </Link>
        <Link
          to={`/orders/${id}/edit`}
          className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
        >
          <PencilIcon className="h-4 w-4 mr-1" />
          Edit
        </Link>
      </div>
      
      <OrderView order={order} />
    </div>
  )
}

export default OrderDetailPage  