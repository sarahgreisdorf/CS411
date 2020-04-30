const express = require('express');
const router = express.Router();

//Controllers
const order_controller = require('../controllers/orderController');

router.post('/create-order', order_controller.create_order);

module.exports = router;
