import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../utils/api'
import toast from 'react-hot-toast'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [actionLoading, setActionLoading] = useState({})
  const { refreshCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders')
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return '✅'
      case 'pending': return '⏳'
      case 'processing': return '📦'
      case 'shipped': return '🚚'
      case 'delivered': return '🎉'
      case 'cancelled': return '❌'
      default: return '📋'
    }
  }

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return
    
    setActionLoading(prev => ({ ...prev, [orderId]: 'cancelling' }))
    try {
      await api.put(`/orders/${orderId}/cancel`)
      toast.success('Order cancelled successfully')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to cancel order')
    } finally {
      setActionLoading(prev => ({ ...prev, [orderId]: null }))
    }
  }

  const handleReorderItems = async (orderId) => {
    setActionLoading(prev => ({ ...prev, [orderId]: 'reordering' }))
    try {
      await api.post(`/orders/${orderId}/reorder`)
      refreshCart() // Refresh cart count in navbar
      toast.success('Items added to cart successfully!')
      navigate('/cart')
    } catch (error) {
      toast.error('Failed to add items to cart')
    } finally {
      setActionLoading(prev => ({ ...prev, [orderId]: null }))
    }
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  filter === status 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
            </h2>
            <p className="text-gray-500 mb-8">
              {filter === 'all' 
                ? 'Start shopping to see your orders here!' 
                : `You don't have any ${filter} orders at the moment.`
              }
            </p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <div className="flex items-center justify-end mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-6">
                    {order.orderItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">{item.product.brand} • {item.product.volume}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">₹{item.price} each</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                    {order.status === 'delivered' && (
                      <button className="btn-primary flex-1">
                        📝 Write Review
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <button className="btn-secondary flex-1">
                        📍 Track Package
                      </button>
                    )}
                    {['pending', 'paid'].includes(order.status) && (
                      <button 
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={actionLoading[order.id] === 'cancelling'}
                        className="btn-secondary flex-1 disabled:opacity-50"
                      >
                        {actionLoading[order.id] === 'cancelling' ? 'Cancelling...' : '❌ Cancel Order'}
                      </button>
                    )}
                    <button 
                      onClick={() => handleReorderItems(order.id)}
                      disabled={actionLoading[order.id] === 'reordering'}
                      className="btn-secondary flex-1 disabled:opacity-50"
                    >
                      {actionLoading[order.id] === 'reordering' ? 'Adding...' : '🛒 Reorder Items'}
                    </button>
                    <button className="btn-secondary flex-1">
                      📄 Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Summary Stats */}
        {orders.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{orders.length}</div>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ₹{orders.reduce((sum, order) => sum + order.total, 0).toFixed(0)}
                </div>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => o.status === 'delivered').length}
                </div>
                <p className="text-sm text-gray-600">Delivered</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => ['pending', 'paid', 'processing', 'shipped'].includes(o.status)).length}
                </div>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders