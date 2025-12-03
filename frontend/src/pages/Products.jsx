import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../utils/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const { addToCart } = useCart()
  const { user } = useAuth()

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || '',
    page: parseInt(searchParams.get('page')) || 1
  })

  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: 1
  })

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
      
      const { data } = await api.get(`/products?${params}`)
      setProducts(data.products)
      setPagination({
        total: data.total,
        pages: data.pages,
        currentPage: data.currentPage
      })
    } catch (error) {
      console.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 }
    setFilters(newFilters)
    
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    setSearchParams(params)
  }

  const handleAddToCart = async (productId) => {
    if (!user) {
      toast.error('Please login first')
      return
    }
    
    try {
      await addToCart(productId)
      toast.success('Added to cart!')
    } catch (error) {
      toast.error('Failed to add to cart')
    }
  }

  const changePage = (page) => {
    setFilters(prev => ({ ...prev, page }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">🥥 Premium Cooking Oils 🫒</h1>
        <p className="text-gray-600">Discover our collection of high-quality cooking oils</p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search oils..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="input-field"
          />
          <select 
            value={filters.category} 
            onChange={(e) => updateFilter('category', e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            <option value="olive">Olive Oil</option>
            <option value="coconut">Coconut Oil</option>
            <option value="mustard">Mustard Oil</option>
            <option value="sesame">Sesame Oil</option>
            <option value="sunflower">Sunflower Oil</option>
            <option value="avocado">Avocado Oil</option>
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="input-field"
          />
          <select 
            value={filters.sort} 
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="input-field"
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="latest">Latest</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100">
                <Link to={`/products/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-t-xl" 
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm mb-2">{product.brand} • {product.volume}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-primary font-bold text-xl">₹{product.price}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' : 
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`w-full py-2 rounded-lg font-medium transition-colors ${
                      product.stock === 0 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-primary text-white hover:bg-orange-600'
                    }`}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`px-4 py-2 rounded ${
                    page === pagination.currentPage 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Products