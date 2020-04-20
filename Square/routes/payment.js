const express = require('express');
const router = express.Router();

//Controllers
const payment_controller = require('../controllers/paymentController');

router.post('/pay-order', payment_controller.pay_order);

module.exports = router;