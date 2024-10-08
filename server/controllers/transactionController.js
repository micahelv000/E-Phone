const jwt = require('jsonwebtoken');
const Transaction = require('../models/Transaction');

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const userId = req.user._id;
        const username = req.user.username;  // Assuming username is available in the user object

        const { Items, TotalPrice, TotalQuantity, OrderDate } = req.body;
        const newTransaction = new Transaction({
            UserId: userId,
            username: username,  // Include username
            Items,
            TotalPrice,
            TotalQuantity,
            OrderDate
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all transactions
exports.getAdminAllTransactions = async (req, res) => {
    try {
        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const transactions = await Transaction.find(); // Fetch all transactions
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const userId = req.user._id;

        const transactions = await Transaction.find({ UserId: userId });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id); // Use Transaction
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a transaction by ID
exports.updateTransactionById = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate( // Use Transaction
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a transaction by ID
exports.deleteTransactionById = async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id); // Use Transaction
        if (!deletedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
