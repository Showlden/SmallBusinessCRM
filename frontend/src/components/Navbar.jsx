import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { name: 'Dashboard', to: '/', icon: HomeIcon, current: location.pathname === '/' },
    { name: 'Customers', to: '/customers', icon: UsersIcon, current: location.pathname.startsWith('/customers') },
    { name: 'Orders', to: '/orders', icon: ShoppingBagIcon, current: location.pathname.startsWith('/orders') },
  ]

  return (
    <nav className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center">
            <span className="hidden sm:inline">CustomerOrders</span>
            <span className="sm:hidden">CO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user && (
              <div className="flex space-x-6">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${item.current ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600'}`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* User Controls */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                      {user.full_name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {user ? (
              <>
                <div className="flex items-center px-4 py-3 border-b border-gray-200">
                  <UserCircleIcon className="h-8 w-8 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{user.full_name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-md ${item.current ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2" />
                      {item.name}
                    </div>
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/login' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/register' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar