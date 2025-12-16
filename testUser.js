const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/bebarDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

async function test() {
  try {
    const u = new User({
      name: "Ali",
      email: "ali@example.com",
      password: "12345"
    });

    const savedUser = await u.save();
    console.log('User saved:', savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
  } finally {
    mongoose.connection.close();
  }
}

test();
