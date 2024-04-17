// models/Offer.js

const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  discountPercentage: {
    type: Number,
    required: true
  },
  validityPeriod: {
    type: Date,
    required: true
  }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
