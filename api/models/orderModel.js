'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	order_id: String,
	total_money: {
    amount: Number,
    currency: String,
  },
  state: String,
  customer_id: String,
});

module.exports = mongoose.model('Orders', orderSchema);