import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import CustomersPage from './pages/CustomersPage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerCreatePage from './pages/CustomerCreatePage'
import CustomerEditPage from './pages/CustomerEditPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import OrderCreatePage from './pages/OrderCreatePage'
import OrderEditPage from './pages/OrderEditPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<DashboardPage />} />
          
          <Route path="customers">
            <Route index element={<CustomersPage />} />
            <Route path="new" element={<CustomerCreatePage />} />
            <Route path=":id" element={<CustomerDetailPage />} />
            <Route path=":id/edit" element={<CustomerEditPage />} />
          </Route>
          
          <Route path="orders">
            <Route index element={<OrdersPage />} />
            <Route path="new" element={<OrderCreatePage />} />
            <Route path=":id" element={<OrderDetailPage />} />
            <Route path=":id/edit" element={<OrderEditPage />} />
          </Route>
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App