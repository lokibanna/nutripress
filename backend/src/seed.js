const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('./utils/auth');
const prisma = new PrismaClient();

const products = [
  {
    name: "Extra Virgin Olive Oil",
    description: "Premium cold-pressed olive oil from Mediterranean olives. Rich in antioxidants and perfect for salads and cooking.",
    price: 899,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    category: "olive",
    volume: "500ml",
    rating: 4.8,
    stock: 50,
    brand: "Mediterranean Gold"
  },
  {
    name: "Organic Coconut Oil",
    description: "Pure organic coconut oil, cold-pressed and unrefined. Perfect for cooking and skincare.",
    price: 549,
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400",
    category: "coconut",
    volume: "500ml",
    rating: 4.6,
    stock: 75,
    brand: "Tropical Pure"
  },
  {
    name: "Mustard Oil Premium",
    description: "Traditional mustard oil, perfect for Indian cooking. Rich flavor and aroma.",
    price: 299,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    category: "mustard",
    volume: "1L",
    rating: 4.4,
    stock: 100,
    brand: "Desi Gold"
  },
  {
    name: "Sesame Oil Pure",
    description: "Cold-pressed sesame oil with rich nutty flavor. Great for Asian cuisine.",
    price: 449,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    category: "sesame",
    volume: "250ml",
    rating: 4.5,
    stock: 60,
    brand: "Asian Essence"
  },
  {
    name: "Sunflower Oil Refined",
    description: "Light and healthy sunflower oil for everyday cooking.",
    price: 199,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    category: "sunflower",
    volume: "1L",
    rating: 4.2,
    stock: 120,
    brand: "Sunny Fresh"
  },
  {
    name: "Avocado Oil Premium",
    description: "High-quality avocado oil with mild flavor and high smoke point.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    category: "avocado",
    volume: "250ml",
    rating: 4.9,
    stock: 30,
    brand: "Green Gold"
  }
];

async function seed() {
  try {
    // Create admin user
    const adminPassword = await hashPassword('admin123');
    await prisma.user.upsert({
      where: { email: 'admin@nutripress.com' },
      update: {},
      create: {
        name: 'Admin',
        email: 'admin@nutripress.com',
        password: adminPassword,
        role: 'admin'
      }
    });

    // Create products
    for (const product of products) {
      const existing = await prisma.product.findFirst({ where: { name: product.name } });
      if (!existing) {
        await prisma.product.create({ data: product });
      }
    }
    
    console.log('✅ Database seeded successfully!');
    console.log('📧 Admin login: admin@nutripress.com / admin123');
  } catch (error) {
    console.error('❌ Seed error:', error.message);
  }
}

seed().finally(() => prisma.$disconnect());