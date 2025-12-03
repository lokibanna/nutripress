import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import toast from 'react-hot-toast'

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }
      
      const { data } = await api.get('/cart')
      setCartItems(Array.isArray(data) ? data : [])
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login')
      } else {
        setCartItems([])
        toast.error('Failed to load cart')
      }
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return
    
    try {
      await api.put(`/cart/${itemId}`, { quantity: newQuantity })
      await fetchCart()
      toast.success('Quantity updated')
    } catch (error) {
      toast.error('Failed to update quantity')
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`)
      await fetchCart()
      toast.success('Item removed from cart')
    } catch (error) {
      toast.error('Failed to remove item')
    }
  }

  const cartTotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * (item.quantity || 0)
  }, 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Shopping Cart</h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some delicious cooking oils to get started!</p>
            <Link 
              to="/products" 
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-6">
                    <img 
                      src={item.product?.image || '/placeholder.jpg'} 
                      alt={item.product?.name || 'Product'} 
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0" 
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">
                        {item.product?.name || 'Unknown Product'}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {item.product?.brand} • {item.product?.volume}
                      </p>
                      <p className="text-primary font-bold text-lg">
                        ₹{item.product?.price || 0}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-lg">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-xl text-gray-800 mb-2">
                        ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-600">Total ({cartItems.length} items)</p>
                  <p className="text-3xl font-bold text-gray-800">₹{cartTotal.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-2">Free delivery on orders above ₹500</p>
                  <p className="text-sm text-green-600">✓ Secure checkout</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="flex-1 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors text-center font-medium"
                >
                  Continue Shopping
                </Link>
                <Link 
                  to="/checkout" 
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors text-center font-medium"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart