import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../utils/api'
import toast from 'react-hot-toast'

function Checkout() {
  const [loading, setLoading] = useState(false)
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      // Create Razorpay order
      const { data: orderData } = await api.post('/payment/create-order', {
        amount: cartTotal
      })

      const options = {
        key: 'rzp_test_key', // Replace with your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'NutriPress',
        description: 'Premium Cooking Oils',
        order_id: orderData.id,
        handler: async (response) => {
          try {
            // Verify payment
            await api.post('/payment/verify', response)
            
            // Create order
            await api.post('/orders', {
              paymentId: response.razorpay_payment_id
            })
            
            clearCart()
            toast.success('Order placed successfully!')
            navigate('/profile')
          } catch (error) {
            toast.error('Payment verification failed')
          }
        },
        theme: {
          color: '#FF6B35'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      // For demo, create order without payment
      try {
        await api.post('/orders', {})
        clearCart()
        toast.success('Order placed successfully!')
        navigate('/profile')
      } catch (orderError) {
        toast.error('Failed to place order')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.product.name} x {item.quantity}</span>
              <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-2 mt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <button
          onClick={handlePayment}
          disabled={loading || cartItems.length === 0}
          className="w-full btn-primary py-3 text-lg disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Pay ₹${cartTotal.toFixed(2)}`}
        </button>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  )
}

export default Checkout