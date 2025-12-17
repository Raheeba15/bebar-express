const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Clear existing products
    await Product.deleteMany({});
    console.log("✅ Cleared existing products");

    // Comprehensive sample product data
    const products = [
      // Beverages/Alcohol
      { name: "Premium Whiskey", price: 50, category: "Alcohol", image: "https://images.unsplash.com/photo-1608270586620-248524c67e53?w=400", description: "Smooth aged whiskey with rich flavors" },
      { name: "Craft Beer", price: 10, category: "Alcohol", image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400", description: "Locally brewed craft beer" },
      { name: "Red Wine", price: 35, category: "Alcohol", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400", description: "Full-bodied red wine" },
      { name: "White Wine", price: 30, category: "Alcohol", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400", description: "Crisp and refreshing white wine" },
      { name: "Vodka", price: 40, category: "Alcohol", image: "https://images.unsplash.com/photo-1608270586208-63e97b0e0c0a?w=400", description: "Premium vodka, perfect for cocktails" },
      { name: "Rum", price: 45, category: "Alcohol", image: "https://images.unsplash.com/photo-1608270586208-63e97b0e0c0a?w=400", description: "Aged rum with caramel notes" },
      { name: "Gin", price: 38, category: "Alcohol", image: "https://images.unsplash.com/photo-1608270586208-63e97b0e0c0a?w=400", description: "Botanical gin with juniper flavors" },
      { name: "Tequila", price: 42, category: "Alcohol", image: "https://images.unsplash.com/photo-1608270586208-63e97b0e0c0a?w=400", description: "Premium tequila, 100% agave" },
      
      // Soft Drinks
      { name: "Cola", price: 5, category: "Soft Drink", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400", description: "Classic cola drink" },
      { name: "Lemonade", price: 6, category: "Soft Drink", image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2fdc?w=400", description: "Fresh squeezed lemonade" },
      { name: "Orange Juice", price: 7, category: "Soft Drink", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400", description: "100% fresh orange juice" },
      { name: "Iced Tea", price: 5, category: "Soft Drink", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400", description: "Refreshing iced tea" },
      { name: "Sparkling Water", price: 4, category: "Soft Drink", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400", description: "Natural sparkling water" },
      { name: "Energy Drink", price: 8, category: "Soft Drink", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400", description: "High-energy beverage" },
      
      // Cocktails
      { name: "Mojito", price: 12, category: "Cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", description: "Classic mojito with mint and lime" },
      { name: "Margarita", price: 14, category: "Cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", description: "Traditional margarita cocktail" },
      { name: "Old Fashioned", price: 16, category: "Cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", description: "Classic whiskey cocktail" },
      { name: "Cosmopolitan", price: 13, category: "Cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", description: "Elegant vodka-based cocktail" },
      { name: "Piña Colada", price: 11, category: "Cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", description: "Tropical coconut cocktail" },
      
      // Snacks
      { name: "Nachos", price: 8, category: "Snacks", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400", description: "Loaded nachos with cheese and jalapeños" },
      { name: "Wings", price: 12, category: "Snacks", image: "https://images.unsplash.com/photo-1527477396000-e27137b25c24?w=400", description: "Spicy buffalo wings" },
      { name: "Fries", price: 6, category: "Snacks", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400", description: "Crispy golden fries" },
      { name: "Onion Rings", price: 7, category: "Snacks", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400", description: "Beer-battered onion rings" },
      
      // Additional Alcohol Products
      { name: "Champagne", price: 65, category: "Alcohol", image: "https://images.unsplash.com/photo-1608270586208-63e97b0e0c0a?w=400", description: "Premium sparkling champagne" },
      { name: "Bourbon", price: 55, category: "Alcohol", image: "https://images.unsplash.com/photo-1608270586208-63e97b0e0c0a?w=400", description: "Smooth Kentucky bourbon" },
      { name: "Scotch", price: 60, category: "Alcohol", image: "https://images.unsplash.com/photo-1608270586208-63e97b0e0c0a?w=400", description: "Aged single malt scotch" },
      { name: "Sake", price: 25, category: "Alcohol", image: "https://images.unsplash.com/photo-1608270586208-63e97b0e0c0a?w=400", description: "Premium Japanese sake" },
      
      // Additional Soft Drinks
      { name: "Ginger Ale", price: 5, category: "Soft Drink", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400", description: "Refreshing ginger ale" },
      { name: "Root Beer", price: 5, category: "Soft Drink", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400", description: "Classic root beer" },
      { name: "Cranberry Juice", price: 7, category: "Soft Drink", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400", description: "100% pure cranberry juice" },
      { name: "Pineapple Juice", price: 6, category: "Soft Drink", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400", description: "Fresh tropical pineapple juice" },
      
      // Additional Cocktails
      { name: "Martini", price: 15, category: "Cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", description: "Classic gin or vodka martini" },
      { name: "Manhattan", price: 16, category: "Cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", description: "Whiskey-based classic cocktail" },
      { name: "Moscow Mule", price: 13, category: "Cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", description: "Vodka, ginger beer, and lime" },
      { name: "Daiquiri", price: 12, category: "Cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", description: "Rum-based tropical cocktail" },
      { name: "Negroni", price: 14, category: "Cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", description: "Italian aperitif cocktail" },
      
      // Additional Snacks
      { name: "Mozzarella Sticks", price: 9, category: "Snacks", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400", description: "Crispy mozzarella sticks with marinara" },
      { name: "Chicken Tenders", price: 11, category: "Snacks", image: "https://images.unsplash.com/photo-1527477396000-e27137b25c24?w=400", description: "Golden fried chicken tenders" },
      { name: "Loaded Potato Skins", price: 10, category: "Snacks", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400", description: "Crispy potato skins with cheese and bacon" },
      { name: "Quesadilla", price: 9, category: "Snacks", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400", description: "Cheesy grilled quesadilla" }
    ];

    await Product.insertMany(products);
    console.log(`✅ ${products.length} sample products added`);

    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  });
