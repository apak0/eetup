'use client'
export default function CheckoutPage() {
  const savedBasket: any = JSON.parse(localStorage.getItem('savedBaskets') || '{}') || {}

  console.log('ahoy1', savedBasket)

  return (
    <div className="max-w-7xl min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="text-gray-600">Please complete your order</p>
    </div>
  )
}
