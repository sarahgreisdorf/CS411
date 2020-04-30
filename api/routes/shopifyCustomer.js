const express = require('express');
const router = express.Router();

//Controllers
const customer_controller = require('../controllers/shopifyCustomerController');

router.post('/new-customer', shopifyCustomerController.new_customer);


module.exports = router;