const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    TransactionId: { type: String, required: true, unique: true }, 
    User: { type: String, required: true },
    Items: [{
        ItemSlug: { type: String, required: true },
        ItemName: { type: String, required: true },
        Quantity: { type: Number, required: true },
        Price: { type: Number, required: true }
    }],
    TotalPrice: { type: Number, required: true },
    TotalQuantity: { type: Number, required: true },
    OrderDate: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
