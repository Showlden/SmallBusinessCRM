import { 
  ClipboardDocumentIcon,
  UserIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

const statusIcons = {
  completed: CheckCircleIcon,
  cancelled: XCircleIcon,
  new: ClockIcon,
  in_progress: ClockIcon
}

const statusColors = {
  completed: 'text-green-500',
  cancelled: 'text-red-500',
  new: 'text-yellow-500',
  in_progress: 'text-blue-500'
}

const OrderView = ({ order }) => {
  const StatusIcon = statusIcons[order.status] || ClockIcon
  const statusColor = statusColors[order.status] || 'text-gray-500'

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Order Details
          </h3>
          <div className={`flex items-center ${statusColor}`}>
            <StatusIcon className="h-5 w-5 mr-1" />
            <span className="font-medium">{order.status_display}</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <ClipboardDocumentIcon className="h-5 w-5 mr-2 text-gray-400" />
              Description
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {order.description}
            </dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
              Customer
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {order.customer_detail.name}
            </dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 mr-2 text-gray-400" />
              Total Price
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              ${order.total_price}
            </dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
              Created At
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(order.created_at).toLocaleDateString()}
            </dd>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderView