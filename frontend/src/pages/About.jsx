import { Link } from 'react-router-dom'

function About() {
  const team = [
    { name: 'Rajesh Kumar', role: 'Founder & CEO', image: '👨‍💼' },
    { name: 'Priya Sharma', role: 'Quality Manager', image: '👩‍🔬' },
    { name: 'Amit Singh', role: 'Supply Chain Head', image: '👨‍💻' }
  ]

  const values = [
    { icon: '🌱', title: 'Natural & Pure', desc: 'We source only the finest, natural oils without any artificial additives' },
    { icon: '🏆', title: 'Premium Quality', desc: 'Every bottle meets our strict quality standards and certifications' },
    { icon: '🤝', title: 'Customer First', desc: 'Your satisfaction is our priority with excellent customer service' },
    { icon: '🌍', title: 'Sustainable', desc: 'We support sustainable farming and eco-friendly packaging' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About NutriPress</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Since 2020, we've been passionate about bringing you the finest cooking oils from around the world. 
            Our mission is to make premium, healthy cooking oils accessible to every kitchen.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                NutriPress was born from a simple belief: everyone deserves access to pure, high-quality cooking oils. 
                Our founder, Rajesh Kumar, started this journey after struggling to find authentic, unprocessed oils 
                for his family's kitchen.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Today, we work directly with farmers and producers across India and internationally to bring you 
                oils that are not just pure, but also ethically sourced and sustainably produced.
              </p>
              <Link to="/products" className="btn-primary">
                Shop Our Collection
              </Link>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🥥</div>
              <p className="text-gray-600 italic">From farm to your kitchen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-orange-100">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-orange-100">Premium Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-orange-100">Partner Farms</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <p className="text-orange-100">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Experience Pure Quality?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers who trust NutriPress for their cooking needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary">
              Shop Now
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About