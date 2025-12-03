import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg border-b fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-orange-600">
            🥥 NutriPress
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Contact
            </Link>
            
            {user ? (
              <>
                <Link to="/cart" className="relative text-gray-700 hover:text-primary font-medium transition-colors">
                  🛒 Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-primary font-medium transition-colors">
                  📦 Orders
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary font-medium transition-colors">
                  👤 Profile
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors">
                    ⚙️ Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary font-medium transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            <Link to="/" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
              Home
            </Link>
            <Link to="/products" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
              Products
            </Link>
            <Link to="/about" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
              About
            </Link>
            <Link to="/contact" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
              Contact
            </Link>
            
            {user ? (
              <>
                <Link to="/orders" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                  📦 Orders
                </Link>
                <Link to="/profile" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                  👤 Profile
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={closeMobileMenu} className="block px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors">
                    ⚙️ Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                  Login
                </Link>
                <Link to="/signup" onClick={closeMobileMenu} className="block px-3 py-2 bg-primary text-white hover:bg-orange-600 rounded-md transition-colors text-center">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar