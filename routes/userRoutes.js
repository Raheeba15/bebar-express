const express = require('express');
const User = require('../models/user'); // your model

const router = express.Router();

// Save user from form
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body); // uses model
    res.send('User saved!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
