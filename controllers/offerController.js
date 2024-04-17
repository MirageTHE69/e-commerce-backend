// controllers/offerController.js

const Offer = require('../models/Offer');

exports.createOffer = async (req, res) => {
  try {
    const { name, description, discountPercentage, validityPeriod, products } = req.body;

    const newOffer = new Offer({
      name,
      description,
      discountPercentage,
      validityPeriod,
      products
    });

    await newOffer.save();

    res.status(201).json({ message: 'Offer created successfully', offer: newOffer });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
