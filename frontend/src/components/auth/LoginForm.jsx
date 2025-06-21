import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../context/AuthContext'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

const LoginForm = () => {
  const { login } = useAuth()

  return (
    <div className="space-y-6">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await login(values)
          } catch (error) {
            setErrors({ email: 'Invalid credentials', password: 'Invalid credentials' })
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address*
              </label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password*
              </label>
              <Field
                type="password"
                name="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <Link
          to="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Register
        </Link>
      </div>
    </div>
  )
}

export default LoginForm