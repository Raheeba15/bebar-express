const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// GET payment page
router.get('/payment', (req, res) => res.render('payment'));

// POST payment form
router.post('/payment', async (req, res) => {
  try {
    const { name, phone, email, address, payment } = req.body;
    const order = new Order({ name, phone, email, address, paymentMethod: payment });
    await order.save();
    res.redirect('/success');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router; // ✅ must export the router
