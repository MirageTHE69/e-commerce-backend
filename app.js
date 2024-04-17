// app.js

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors package
const productRoutes = require("./routes/productRoutes");
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes')
const offerRoutes = require('./routes/offerRoutes')
const checkoutRoutes = require('./routes/checkoutRoutes')

const app = express();

// MongoDB Connection
const mongoURI =
  "mongodb+srv://mthakore12:miru2000@cluster0.iba1sa7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// Routes
app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes); // Use cart routes
app.use('/api/offers', offerRoutes); // Use offer routes
app.use('/api/checkout', checkoutRoutes); // Use checkout routes


module.exports = app;
