import CustomerForm from '../components/customers/CustomerForm'

const CustomerEditPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Customer</h1>
      <CustomerForm />
    </div>
  )
}

export default CustomerEditPage