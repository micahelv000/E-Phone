const express = require('express');
const { getItemDetails, updateItem, getItems } = require('../controllers/itemController');

const router = express.Router();

router.get('/item-details/:slug', getItemDetails);
router.put('/update-item/:slug', updateItem);
router.get('/items', getItems);

module.exports = router;