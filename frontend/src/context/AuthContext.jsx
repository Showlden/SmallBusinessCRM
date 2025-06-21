import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, refreshToken, getUserProfile } from '../api/auth'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token)
          
          if (decoded.exp * 1000 < Date.now()) {
            await handleRefreshToken()
          } else {
            const userData = await getUserProfile()
            setUser(userData)
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        logout()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [token])

  const handleRefreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refreshToken')
      if (refresh) {
        const data = await refreshToken(refresh)
        localStorage.setItem('token', data.access)
        setToken(data.access)
        
        const userData = await getUserProfile()
        setUser(userData)
      } else {
        throw new Error('No refresh token available')
      }
    } catch (error) {
      throw error
    }
  }

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials)
      localStorage.setItem('token', data.access)
      localStorage.setItem('refreshToken', data.refresh)
      setToken(data.access)
      setUser(data.user)
      navigate('/')
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      await registerUser(userData)
      navigate('/login')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)