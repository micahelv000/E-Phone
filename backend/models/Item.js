const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  stock: { type: Number, default: 0 },
  price: { type: Number, default: 0 }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;