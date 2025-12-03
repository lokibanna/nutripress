import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Breadcrumb from '../components/Breadcrumb'
import toast from 'react-hot-toast'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`)
      setProduct(data)
    } catch (error) {
      toast.error('Product not found')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login first')
      return
    }
    
    try {
      await addToCart(product.id)
      toast.success('Added to cart!')
    } catch (error) {
      toast.error('Failed to add to cart')
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!product) return <div className="text-center py-12">Product not found</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: 'Products', href: '/products' },
        { label: product?.name || 'Product Details' }
      ]} />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-96 object-cover rounded-lg" 
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.brand} • {product.volume}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1 text-gray-600">{product.rating} rating</span>
          </div>
          <p className="text-3xl font-bold text-primary mb-6">₹{product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-sm text-gray-600 mb-6">Stock: {product.stock} units available</p>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary w-full md:w-auto px-8 py-3 text-lg disabled:opacity-50"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails