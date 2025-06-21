import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../context/AuthContext'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  full_name: Yup.string().required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

const RegisterForm = () => {
  const { register } = useAuth()

  return (
    <div className="space-y-6">
      <Formik
        initialValues={{
          email: '',
          full_name: '',
          password: '',
          password2: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await register(values)
          } catch (error) {
            setErrors({ email: 'Registration failed', password: 'Registration failed' })
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
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Full Name*
              </label>
              <Field
                type="text"
                name="full_name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <ErrorMessage name="full_name" component="div" className="text-red-500 text-sm" />
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

            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Confirm Password*
              </label>
              <Field
                type="password"
                name="password2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <ErrorMessage name="password2" component="div" className="text-red-500 text-sm" />
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
                  'Register'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default RegisterForm