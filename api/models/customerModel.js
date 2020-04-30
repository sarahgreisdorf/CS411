'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
	sq_id: String,
	given_name: String,
	family_name: String,
	email_address: String,
	phone_number: String,
});

module.exports = mongoose.model('Customers', customerSchema);
