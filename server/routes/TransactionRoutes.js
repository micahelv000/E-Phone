const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

router.post('/create-transaction', authenticateToken, TransactionController.createTransaction);
router.get('/all-transactions', authenticateToken, TransactionController.getAllTransactions);
router.get('/transaction/:id', TransactionController.getTransactionById);
router.put('/update-transaction/:id', TransactionController.updateTransactionById);
router.delete('/delete-transaction/:id', TransactionController.deleteTransactionById);

module.exports = router;