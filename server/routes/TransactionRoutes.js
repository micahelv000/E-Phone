const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');

router.post('/create-transaction', TransactionController.createTransaction);
router.get('/all-transactions', TransactionController.getAllTransactions);
router.get('/transaction/:id', TransactionController.getTransactionById);
router.put('/update-transaction/:id', TransactionController.updateTransactionById);
router.delete('/delete-transaction/:id', TransactionController.deleteTransactionById);

module.exports = router;