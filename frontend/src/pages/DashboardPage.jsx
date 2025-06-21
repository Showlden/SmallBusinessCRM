import { useState, useEffect } from 'react'
import { ChartBarIcon, UserGroupIcon, ShoppingBagIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import StatCard from '../components/StatCard'
import RecentOrders from '../components/orders/RecentOrders'
import { getCustomers } from '../api/customers'
import { getOrders } from '../api/orders'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'

const DashboardPage = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [customersResponse, ordersResponse] = await Promise.all([
          getCustomers(),
          getOrders('?ordering=-created_at&limit=5')
        ])
        
        const totalRevenue = ordersResponse.reduce(
          (sum, order) => sum + parseFloat(order.total_price), 0
        )
        
        setStats([
          { 
            title: 'Total Customers', 
            value: customersResponse.length,
            icon: UserGroupIcon,
            change: '+0%' // Можно реализовать сравнение с предыдущим периодом
          },
          { 
            title: 'Total Orders', 
            value: ordersResponse.length,
            icon: ShoppingBagIcon,
            change: '+0%'
          },
          { 
            title: 'Revenue', 
            value: totalRevenue.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            }),
            icon: CurrencyDollarIcon,
            change: '+0%'
          },
        ])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) return <Spinner size="lg" />
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {user && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <RecentOrders />
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardPage