const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const { search, category, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;
  
  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { brand: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } }
    ];
  }
  if (category) where.category = category;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  const orderBy = sort === 'price_asc' ? { price: 'asc' } : 
                  sort === 'price_desc' ? { price: 'desc' } : 
                  sort === 'rating' ? { rating: 'desc' } : 
                  sort === 'latest' ? { createdAt: 'desc' } : {};

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip, take: parseInt(limit) }),
    prisma.product.count({ where })
  ]);

  res.json({ 
    products, 
    total, 
    pages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page)
  });
};

const getProduct = async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

const createProduct = async (req, res) => {
  const { name, description, price, image, category, volume, stock, brand } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price: parseFloat(price), image, category, volume, stock: parseInt(stock), brand }
  });
  res.json(product);
};

const updateProduct = async (req, res) => {
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(product);
};

const deleteProduct = async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ message: 'Product deleted' });
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };