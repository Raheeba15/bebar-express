const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('./db'); 
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.render('index'));
app.get('/buynow', (req, res) => res.render('buynow'));
app.get('/payment', (req, res) => res.render('payment'));
app.get('/success', (req, res) => res.render('success'));
app.get('/barandmenu', (req, res) => res.render('barandmenu'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/happenings', (req, res) => res.render('happenings'));
app.get('/js/testimonials', (req, res) => res.render('testimonials'));


// Add MongoDB API routes
app.use('/users', require('./routes/userRoutes'));
app.use('/', orderRoutes);
app.use('/', productRoutes);
app.use('/', require('./routes/adminRoutes')); // Admin routes - includes /admin, /admin/products, etc.

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});