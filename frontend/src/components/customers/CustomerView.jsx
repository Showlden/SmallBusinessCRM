import { ClipboardDocumentIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

const CustomerView = ({ customer }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Customer Information
        </h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <ClipboardDocumentIcon className="h-5 w-5 mr-2 text-gray-400" />
              Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {customer.name}
            </dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400" />
              Email
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {customer.email || 'Not specified'}
            </dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <PhoneIcon className="h-5 w-5 mr-2 text-gray-400" />
              Phone
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {customer.phone_number}
            </dd>
          </div>
          
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
              Address
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {customer.address || 'Not specified'}
            </dd>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerView