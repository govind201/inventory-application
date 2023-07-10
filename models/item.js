const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: {
    type: Number,
    min: 0,
  },
  numberInStock: {
    type: Number,
    min: 0,
  },
});

module.exports = mongoose.model("Item", itemSchema);
