const express = require('express');
const { createOrder, getOrders, getOrder, updateOrderStatus, cancelOrder, reorderItems } = require('../controllers/orders');
const { authenticate, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrder);
router.put('/:id', authenticate, isAdmin, updateOrderStatus);
router.put('/:id/cancel', authenticate, cancelOrder);
router.post('/:id/reorder', authenticate, reorderItems);

module.exports = router;