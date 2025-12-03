import { Link } from 'react-router-dom'

function Home() {
  const categories = [
    { name: 'Olive Oil', emoji: '🫒', category: 'olive' },
    { name: 'Coconut Oil', emoji: '🥥', category: 'coconut' },
    { name: 'Mustard Oil', emoji: '🌻', category: 'mustard' },
    { name: 'Sesame Oil', emoji: '🌰', category: 'sesame' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            🥥 Premium Cooking Oils 🫒
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the finest quality cooking oils for your kitchen. From extra virgin olive oil to organic coconut oil, we bring you the best from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg">
              🛒 Shop Now
            </Link>
            <Link to="/products" className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-all">
              📱 Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose NutriPress? 🌟</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-green-50 to-green-100 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Premium Quality</h3>
              <p className="text-gray-600">Hand-picked oils from trusted sources worldwide with quality certification</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">Quick and secure delivery to your doorstep within 24-48 hours</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-yellow-50 to-yellow-100 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Best Prices</h3>
              <p className="text-gray-600">Competitive prices with no hidden costs and regular discounts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Shop by Category 🛍️</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map(item => (
              <Link 
                key={item.name}
                to={`/products?category=${item.category}`}
                className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-2">Premium Quality</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Cooking? 👨‍🍳</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of happy customers who trust NutriPress for their cooking needs</p>
          <Link to="/products" className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Start Shopping Now →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home