import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-8">
          <div className="text-9xl mb-4">🫒</div>
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Oops! The page you're looking for seems to have gone missing. 
            Don't worry, our premium oils are still here waiting for you!
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="block w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            🏠 Go Home
          </Link>
          <Link 
            to="/products" 
            className="block w-full border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
          >
            🛒 Shop Products
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/about" className="text-sm text-primary hover:underline">About Us</Link>
            <span className="text-gray-300">•</span>
            <Link to="/contact" className="text-sm text-primary hover:underline">Contact</Link>
            <span className="text-gray-300">•</span>
            <Link to="/profile" className="text-sm text-primary hover:underline">My Account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound