import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { createCustomer, updateCustomer, getCustomer } from '../../api/customers'
import Spinner from '../Spinner'

const CustomerSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email'),
  phone_number: Yup.string().required('Required'),
  address: Yup.string(),
})

const CustomerForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
  })
  const [loading, setLoading] = useState(!!id)

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          const customer = await getCustomer(id)
          setInitialValues({
            name: customer.name,
            email: customer.email,
            phone_number: customer.phone_number,
            address: customer.address,
          })
        } catch (error) {
          console.error('Failed to fetch customer:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchCustomer()
    }
  }, [id])

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await updateCustomer(id, values)
      } else {
        await createCustomer(values)
      }
      navigate('/customers')
    } catch (error) {
      console.error('Failed to save customer:', error)
    }
  }

  if (loading) return <Spinner size="lg" />

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Customer' : 'Add New Customer'}
      </h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={CustomerSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name*
              </label>
              <Field
                name="name"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number*
              </label>
              <Field
                name="phone_number"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <ErrorMessage name="phone_number" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <Field
                as="textarea"
                name="address"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/customers')}
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
                  'Update Customer'
                ) : (
                  'Create Customer'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CustomerForm