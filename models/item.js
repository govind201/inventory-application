const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
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
