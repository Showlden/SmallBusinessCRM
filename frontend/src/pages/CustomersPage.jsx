import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import CustomerList from '../components/customers/CustomerList'
import { getCustomers, deleteCustomer } from '../api/customers'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'

const CustomersPage = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        let url = ''
        if (searchTerm) {
          url += `?search=${searchTerm}`
        }
        const data = await getCustomers(url)
        setCustomers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [searchTerm])

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id)
      setCustomers(customers.filter(customer => customer.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const term = e.target.search.value
    setSearchTerm(term)
  }

  if (loading) return <Spinner size="lg" />
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
            >
              Search
            </button>
          </form>
          
          {user && (
            <Link
              to="/customers/new"
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 whitespace-nowrap"
            >
              <PlusIcon className="h-5 w-5" />
              Add Customer
            </Link>
          )}
        </div>
      </div>
      
      <CustomerList customers={customers} onDelete={handleDelete} />
    </div>
  )
}

export default CustomersPage