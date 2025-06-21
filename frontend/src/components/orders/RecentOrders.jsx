import useAxios from '../../hooks/useAxios'
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage'

const RecentOrders = () => {
  const { data: orders, loading, error } = useAxios('/orders/?ordering=-created_at&limit=5')

  if (loading) return <Spinner size="md" />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.customer_detail?.name || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : order.status === 'cancelled' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status_display}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {parseFloat(order.total_price).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentOrders