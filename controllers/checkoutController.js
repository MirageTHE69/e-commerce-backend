// controllers/checkoutController.js

const User = require('../models/User');
const Offer = require('../models/Offer');

exports.checkout = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find user by ID
    const user = await User.findById(userId).populate('cart');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get current date
    const currentDate = new Date();

    // Find applicable offers
    const offers = await Offer.find({ validityPeriod: { $gte: currentDate } });

    // Calculate total price before discount
    let totalPriceBeforeDiscount = 0;
    user.cart.forEach(product => {
      totalPriceBeforeDiscount += product.price;
    });

    // Apply offers to total price
    let totalDiscount = 0;
    offers.forEach(offer => {
      totalDiscount += totalPriceBeforeDiscount * (offer.discountPercentage / 100);
    });
    const totalPriceAfterDiscount = totalPriceBeforeDiscount - totalDiscount;

    // Mark all items in the cart as checked out (remove from cart)
    user.cart = [];
    await user.save();

    res.status(200).json({ message: 'Checkout successful', totalPrice: totalPriceAfterDiscount, totalDiscountApplied: totalDiscount });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
