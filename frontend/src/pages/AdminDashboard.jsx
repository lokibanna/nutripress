import { useState, useEffect } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'

function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', image: '', category: '', volume: '', stock: '', brand: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products')
      setProducts(data.products)
    } catch (error) {
      toast.error('Failed to fetch products')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, formData)
        toast.success('Product updated!')
      } else {
        await api.post('/products', formData)
        toast.success('Product created!')
      }
      setShowForm(false)
      setEditingProduct(null)
      setFormData({ name: '', description: '', price: '', image: '', category: '', volume: '', stock: '', brand: '' })
      fetchProducts()
    } catch (error) {
      toast.error('Failed to save product')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData(product)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this product?')) {
      try {
        await api.delete(`/products/${id}`)
        toast.success('Product deleted!')
        fetchProducts()
      } catch (error) {
        toast.error('Failed to delete product')
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Brand"
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
              className="input-field"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Volume"
              value={formData.volume}
              onChange={(e) => setFormData({...formData, volume: e.target.value})}
              className="input-field"
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="input-field"
              required
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="input-field"
              required
            >
              <option value="">Select Category</option>
              <option value="olive">Olive Oil</option>
              <option value="coconut">Coconut Oil</option>
              <option value="mustard">Mustard Oil</option>
              <option value="sesame">Sesame Oil</option>
              <option value="sunflower">Sunflower Oil</option>
              <option value="avocado">Avocado Oil</option>
            </select>
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              className="input-field"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input-field col-span-2"
              rows="3"
              required
            />
            <button type="submit" className="btn-primary col-span-2">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.brand}</p>
            <p className="text-primary font-bold text-xl mb-2">₹{product.price}</p>
            <p className="text-sm text-gray-600 mb-4">Stock: {product.stock}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard