import OrderForm from '../components/orders/OrderForm'

const OrderEditPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Order</h1>
      <OrderForm />
    </div>
  )
}

export default OrderEditPage