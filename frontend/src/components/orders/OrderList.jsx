import { Link } from 'react-router-dom'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const OrderList = ({ orders, onDelete }) => {
  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    new: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.customer_detail.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                  {order.status_display}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${order.total_price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link
                    to={`/orders/${order.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => onDelete(order.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList