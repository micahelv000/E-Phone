const express = require('express');
const { getItemDetails, updateItem, getItems, deleteItem, updateStock, checkStock } = require('../controllers/itemController');

const router = express.Router();

router.get('/item-details/:slug', getItemDetails);
router.put('/update-item/:slug', updateItem);
router.get('/items', getItems);
router.delete('/delete-item/:slug', deleteItem);
router.put('/update-stock/:slug', updateStock);
router.get('/check-stock/:slug', checkStock);

module.exports = router;
