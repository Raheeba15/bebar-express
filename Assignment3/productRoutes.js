const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET products page with filters and pagination
router.get('/products', async (req, res) => {
  try {
    // Extract query parameters with defaults
    const category = req.query.category || '';
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : null;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Build filter object
    const filter = {};
    
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    // Build price filter
    const priceFilter = {};
    if (minPrice !== null && minPrice > 0) {
      priceFilter.$gte = minPrice;
    }
    if (maxPrice !== null && maxPrice > 0) {
      priceFilter.$lte = maxPrice;
    }
    if (Object.keys(priceFilter).length > 0) {
      filter.price = priceFilter;
    }

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Calculate skip value
    const skip = (page - 1) * limit;

    // Fetch products with pagination
    const products = await Product.find(filter)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    // Get unique categories for filter dropdown
    const categories = await Product.distinct('category');

    // Helper function to build query string for pagination
    const buildQueryString = (pageNum) => {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (limit !== 10) params.set('limit', limit);
      params.set('page', pageNum);
      return '/products?' + params.toString();
    };

    // Render products page with data
    res.render('products', {
      products: products || [],
      categories: categories || [],
      category: category || '',
      minPrice: minPrice || '',
      maxPrice: maxPrice || '',
      currentPage: page,
      totalPages: totalPages || 1,
      totalProducts: totalProducts || 0,
      limit: limit,
      buildQueryString: buildQueryString
    });
  } catch (err) {
    console.error('❌ Error in /products route:', err);
    
    // Helper function for error case
    const buildQueryString = (pageNum) => {
      return '/products?page=' + pageNum;
    };
    
    res.status(500).render('products', {
      products: [],
      categories: [],
      category: '',
      minPrice: '',
      maxPrice: '',
      currentPage: 1,
      totalPages: 1,
      totalProducts: 0,
      limit: 10,
      buildQueryString: buildQueryString,
      error: 'Error loading products: ' + err.message
    });
  }
});

module.exports = router;

