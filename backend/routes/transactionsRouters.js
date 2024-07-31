const express = require('express'); 
const router = express.Router();     
const transactionsController = require('../controllers/transactionsController'); 

router.post('/', transactionsController.createTransaction);
router.get('/', transactionsController.getAllTransactions);
router.get('/:id', transactionsController.getTransactionById);
router.put('/:id', transactionsController.updateTransactionById);  
router.delete('/:id', transactionsController.deleteTransactionById);

module.exports = router;
