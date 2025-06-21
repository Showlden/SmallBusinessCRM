const StatCard = ({ title, value, icon: Icon, change }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {change && (
        <p className="mt-2 text-sm text-green-600">
          <span className="font-medium">{change}</span> from last month
        </p>
      )}
    </div>
  )
}

export default StatCard