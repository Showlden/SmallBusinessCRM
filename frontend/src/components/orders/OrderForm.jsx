import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { createOrder, updateOrder, getOrder } from '../../api/orders'
import { getCustomers } from '../../api/customers'
import Spinner from '../Spinner'

const OrderSchema = Yup.object().shape({
  customer: Yup.number().required('Required'),
  description: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
  total_price: Yup.number()
    .required('Required')
    .min(0, 'Must be positive'),
})

const OrderForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
    customer: '',
    description: '',
    status: 'new',
    total_price: '',
  })
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загружаем список клиентов
        const customersData = await getCustomers()
        setCustomers(customersData)

        // Если это редактирование, загружаем данные заказа
        if (id) {
          const order = await getOrder(id)
          setInitialValues({
            customer: order.customer,
            description: order.description,
            status: order.status,
            total_price: order.total_price,
          })
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await updateOrder(id, values)
      } else {
        await createOrder(values)
      }
      navigate('/orders')
    } catch (error) {
      console.error('Failed to save order:', error)
    }
  }

  if (loading) return <Spinner size="lg" />

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Order' : 'Create New Order'}
      </h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={OrderSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                Customer*
              </label>
              <Field
                as="select"
                name="customer"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              >
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="customer" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description*
              </label>
              <Field
                as="textarea"
                name="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status*
              </label>
              <Field
                as="select"
                name="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              >
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Field>
              <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="total_price" className="block text-sm font-medium text-gray-700">
                Total Price*
              </label>
              <Field
                name="total_price"
                type="number"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <ErrorMessage name="total_price" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/orders')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                ) : id ? (
                  'Update Order'
                ) : (
                  'Create Order'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default OrderForm