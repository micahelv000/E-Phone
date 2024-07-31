const express = require('express'); 
const router = express.Router();     
const TransactionController = require('../controllers/transactionController'); 

router.post('/', TransactionController.createTransaction);
router.get('/', TransactionController.getAllTransactions);
router.get('/:id', TransactionController.getTransactionById);
router.put('/:id', TransactionController.updateTransactionById);  
router.delete('/:id', TransactionController.deleteTransactionById);

module.exports = router;
