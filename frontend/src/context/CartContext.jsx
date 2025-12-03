import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const fetchCart = async () => {
    if (!user) {
      setCartItems([])
      return
    }
    try {
      setLoading(true)
      const { data } = await api.get('/cart')
      setCartItems(data || [])
    } catch (error) {
      console.error('Failed to fetch cart')
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [user])

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post('/cart', { productId, quantity })
      fetchCart()
    } catch (error) {
      throw error
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      await api.put(`/cart/${itemId}`, { quantity })
      fetchCart()
    } catch (error) {
      throw error
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`)
      fetchCart()
    } catch (error) {
      throw error
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const refreshCart = () => {
    fetchCart()
  }

  const cartTotal = (cartItems || []).reduce((sum, item) => sum + (item.product?.price * item.quantity || 0), 0)
  const cartCount = (cartItems || []).reduce((sum, item) => sum + (item.quantity || 0), 0)

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
    refreshCart,
    cartTotal,
    cartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}