const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { paymentId } = req.body;
  
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: req.userId },
    include: { product: true }
  });

  if (!cartItems.length) return res.status(400).json({ error: 'Cart is empty' });

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const order = await prisma.order.create({
    data: {
      userId: req.userId,
      total,
      paymentId,
      status: paymentId ? 'paid' : 'pending',
      orderItems: {
        create: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        }))
      }
    },
    include: { orderItems: { include: { product: true } } }
  });

  await prisma.cartItem.deleteMany({ where: { userId: req.userId } });
  res.json(order);
};

const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
};

const getOrder = async (req, res) => {
  const order = await prisma.order.findFirst({
    where: { id: req.params.id, userId: req.userId },
    include: { orderItems: { include: { product: true } } }
  });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status }
  });
  res.json(order);
};

const cancelOrder = async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: req.params.id, userId: req.userId }
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    if (!['pending', 'paid'].includes(order.status)) {
      return res.status(400).json({ error: 'Order cannot be cancelled' });
    }
    
    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: 'cancelled' },
      include: { orderItems: { include: { product: true } } }
    });
    
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel order' });
  }
};

const reorderItems = async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: { orderItems: { include: { product: true } } }
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Add items back to cart
    for (const item of order.orderItems) {
      const existingCartItem = await prisma.cartItem.findFirst({
        where: { userId: req.userId, productId: item.productId }
      });
      
      if (existingCartItem) {
        await prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + item.quantity }
        });
      } else {
        await prisma.cartItem.create({
          data: {
            userId: req.userId,
            productId: item.productId,
            quantity: item.quantity
          }
        });
      }
    }
    
    res.json({ message: 'Items added to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder items' });
  }
};

module.exports = { createOrder, getOrders, getOrder, updateOrderStatus, cancelOrder, reorderItems };