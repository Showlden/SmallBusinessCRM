import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useAuth } from '../context/AuthContext'

const Layout = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {user ? (
          <Outlet />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">Please log in to access the dashboard</h2>
          </div>
        )}
      </main>
    </div>
  )
}

export default Layout