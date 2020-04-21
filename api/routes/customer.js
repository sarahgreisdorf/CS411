const express = require('express');
const router = express.Router();

//Controllers
const customer_controller = require('../controllers/customerController');

router.post('/new-customer', customer_controller.new_customer);

router.get('/list-customers', customer_controller.list_customers);

module.exports = router;
