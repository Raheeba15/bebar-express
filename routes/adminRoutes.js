const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Admin Dashboard
router.get('/admin', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Product.distinct('category').then(cats => cats.length);
    
    // Get price statistics
    const products = await Product.find({}, 'price');
    const prices = products.map(p => p.price);
    const avgPrice = prices.length > 0 
      ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
      : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    
    res.render('admin/dashboard', {
      layout: 'admin/layout',
      title: 'Dashboard',
      pageTitle: 'Dashboard',
      activePage: 'dashboard',
      totalProducts,
      totalCategories,
      avgPrice,
      maxPrice
    });
  } catch (err) {
    console.error('Error loading dashboard:', err);
    res.status(500).send('Error loading dashboard');
  }
});

// Product List (Read)
router.get('/admin/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.render('admin/products', {
      layout: 'admin/layout',
      title: 'Products',
      pageTitle: 'Product Management',
      activePage: 'products',
      products: products || [],
      currentPage: page,
      totalPages: totalPages || 1,
      totalProducts: totalProducts || 0,
      limit: limit,
      query: req.query
    });
  } catch (err) {
    console.error('Error loading products:', err);
    res.status(500).send('Error loading products');
  }
});

// Add Product Form (Create - GET)
router.get('/admin/products/new', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.render('admin/product-form', {
      layout: 'admin/layout',
      title: 'Add Product',
      pageTitle: 'Add New Product',
      activePage: 'add-product',
      product: null,
      categories: categories || [],
      formAction: '/admin/products',
      formMethod: 'POST',
      error: req.query.error || null
    });
  } catch (err) {
    console.error('Error loading add product form:', err);
    res.status(500).send('Error loading form');
  }
});

// Create Product (Create - POST)
router.post('/admin/products', async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;
    
    // Validation
    if (!name || !price || !category || !image || !description) {
      const categories = await Product.distinct('category');
      return res.render('admin/product-form', {
        layout: 'admin/layout',
        title: 'Add Product',
        pageTitle: 'Add New Product',
        activePage: 'add-product',
        product: req.body,
        categories: categories || [],
        formAction: '/admin/products',
        formMethod: 'POST',
        error: 'All fields are required'
      });
    }

    const product = new Product({
      name,
      price: parseFloat(price),
      category,
      image,
      description
    });

    await product.save();
    res.redirect('/admin/products?success=Product created successfully');
  } catch (err) {
    console.error('Error creating product:', err);
    const categories = await Product.distinct('category').catch(() => []);
    res.render('admin/product-form', {
      layout: 'admin/layout',
      title: 'Add Product',
      pageTitle: 'Add New Product',
      activePage: 'add-product',
      product: req.body,
      categories: categories || [],
      formAction: '/admin/products',
      formMethod: 'POST',
      error: 'Error creating product: ' + err.message
    });
  }
});

// Edit Product Form (Update - GET)
router.get('/admin/products/:id/edit', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.redirect('/admin/products?error=Product not found');
    }

    const categories = await Product.distinct('category');
    res.render('admin/product-form', {
      layout: 'admin/layout',
      title: 'Edit Product',
      pageTitle: 'Edit Product',
      activePage: 'products',
      product: product,
      categories: categories || [],
      formAction: `/admin/products/${product._id}`,
      formMethod: 'POST',
      error: req.query.error || null
    });
  } catch (err) {
    console.error('Error loading edit form:', err);
    res.redirect('/admin/products?error=Error loading product');
  }
});

// Update Product (Update - POST)
router.post('/admin/products/:id', async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;
    
    // Validation
    if (!name || !price || !category || !image || !description) {
      const product = await Product.findById(req.params.id);
      const categories = await Product.distinct('category');
      return res.render('admin/product-form', {
        layout: 'admin/layout',
        title: 'Edit Product',
        pageTitle: 'Edit Product',
        activePage: 'products',
        product: { ...product.toObject(), ...req.body },
        categories: categories || [],
        formAction: `/admin/products/${req.params.id}`,
        formMethod: 'POST',
        error: 'All fields are required'
      });
    }

    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price: parseFloat(price),
      category,
      image,
      description
    });

    res.redirect('/admin/products?success=Product updated successfully');
  } catch (err) {
    console.error('Error updating product:', err);
    res.redirect(`/admin/products/${req.params.id}/edit?error=Error updating product`);
  }
});

// Delete Product (Delete)
router.post('/admin/products/:id/delete', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products?success=Product deleted successfully');
  } catch (err) {
    console.error('Error deleting product:', err);
    res.redirect('/admin/products?error=Error deleting product');
  }
});

module.exports = router;

