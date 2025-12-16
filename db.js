const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/mydatabase'; // or your actual connection string

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
