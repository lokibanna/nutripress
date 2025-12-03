import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '#' },
      { name: 'Press', path: '#' }
    ],
    products: [
      { name: 'Olive Oil', path: '/products?category=olive' },
      { name: 'Coconut Oil', path: '/products?category=coconut' },
      { name: 'Mustard Oil', path: '/products?category=mustard' },
      { name: 'Sesame Oil', path: '/products?category=sesame' }
    ],
    support: [
      { name: 'Help Center', path: '/contact' },
      { name: 'Shipping Info', path: '#' },
      { name: 'Returns', path: '#' },
      { name: 'Track Order', path: '/orders' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
      { name: 'Refund Policy', path: '#' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with NutriPress</h2>
          <p className="text-orange-100 mb-6">Get the latest updates on new products, offers, and cooking tips!</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="text-2xl font-bold text-primary mb-4 block">
                🥥 NutriPress
              </Link>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Premium cooking oils for healthy and delicious cooking. 
                From farm to your kitchen with love.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="text-2xl hover:text-primary transition-colors"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <span className="text-xl">📍</span>
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-white">123 Oil Street, Mumbai, MH 400001</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <span className="text-xl">📞</span>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <span className="text-xl">📧</span>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">hello@nutripress.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} NutriPress. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">🔒</span>
                <span className="text-sm text-gray-400">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">🚚</span>
                <span className="text-sm text-gray-400">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm text-gray-400">Quality Assured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer