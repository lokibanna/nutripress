const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPaymentOrder = async (req, res) => {
  const { amount } = req.body;
  
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    };
    
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Payment order creation failed' });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  // Verify payment signature here
  // For demo purposes, we'll assume it's valid
  res.json({ success: true, paymentId: razorpay_payment_id });
};

module.exports = { createPaymentOrder, verifyPayment };