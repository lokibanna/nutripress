const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCart = async (req, res) => {
  const cart = await prisma.cartItem.findMany({
    where: { userId: req.userId },
    include: { product: true }
  });
  res.json(cart);
};

const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  const existing = await prisma.cartItem.findUnique({
    where: { userId_productId: { userId: req.userId, productId } }
  });

  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
      include: { product: true }
    });
    return res.json(updated);
  }

  const cartItem = await prisma.cartItem.create({
    data: { userId: req.userId, productId, quantity },
    include: { product: true }
  });
  res.json(cartItem);
};

const updateCart = async (req, res) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Item removed' });
  }
  
  const cartItem = await prisma.cartItem.update({
    where: { id: req.params.id },
    data: { quantity },
    include: { product: true }
  });
  res.json(cartItem);
};

const removeFromCart = async (req, res) => {
  await prisma.cartItem.delete({ where: { id: req.params.id } });
  res.json({ message: 'Item removed' });
};

module.exports = { getCart, addToCart, updateCart, removeFromCart };