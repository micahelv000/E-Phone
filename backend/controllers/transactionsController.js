const Transactions = require('../models/Transaction');

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const newTransaction = new Transactions(req.body);
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transactions.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transactions.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a transaction by ID
exports.updateTransactionById = async (req, res) => {
    try {
        const updatedTransaction = await Transactions.findByIdAndUpdate(
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
        const deletedTransaction = await Transactions.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
