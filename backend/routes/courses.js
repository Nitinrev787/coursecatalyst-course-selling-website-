const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const Course = require('../models/Course');
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: 'rzp_test_1neer6St4YXeVt',
  key_secret: 'ycrb3ZtqbpbsQkt1UDI09rqX'
});

router.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

router.get('/my-courses', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  const decoded = jwt.verify(token, 'secret');
  const user = await User.findById(decoded.id).populate('purchasedCourses');
  res.json(user.purchasedCourses);
});

router.post('/courses/buy', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  const { courseId } = req.body;
  if (!courseId) return res.status(400).json({ message: 'Course ID is required' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = await User.findById(decoded.id);
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: 'Course not found' });

    const order = await razorpay.orders.create({
      amount: course.price * 100,
      currency: 'INR',
      receipt: `receipt_order_${Math.random().toString(36).substr(2, 9)}`
    });

    res.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating Razorpay order' });
  }
});

router.post('/payment/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    courseId
  } = req.body;

  try {
    const generated_signature = crypto
      .createHmac('sha256', razorpay.key_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const decoded = jwt.verify(token, 'secret');
    await User.findByIdAndUpdate(decoded.id, {
      $addToSet: { purchasedCourses: courseId }
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
});

module.exports = router;