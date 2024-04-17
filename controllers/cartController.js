// controllers/cartController.js

const User = require('../models/User');
const Product = require('../models/Products');

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if user and product exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add product to user's cart
    user.cart.push(product);
    await user.save();

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
