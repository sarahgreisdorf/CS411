require('../models/customerModel');
const squareConnect = require('square-connect');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customers');

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;

// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;
const customers_api = new squareConnect.CustomersApi();

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';

//Create new Square customer profile
exports.new_customer = async function (req, res) {
	try {
		const response = await customers_api.createCustomer(req.body);
		//Caches customer in db
		const new_customer = new Customer({
			...response.customer,
			sq_id: response.customer.id,
		});
		new_customer.save(function (error) {
			if (error) res.send(error);
		});
		res.status(200).json({
			title: 'Customer created',
			result: response,
		});
	} catch (error) {
		res.status(500).json({
			title: 'Customer creation failed',
			result: error.response.text,
		});
	}
};

//Lists all Square customer profiles
exports.list_customers = async function (req, res) {
	try {
		const response = await customers_api.listCustomers();
		res.status(200).json({
			title: 'Customer list',
			result: response,
		});
	} catch (error) {
		res.status(500).json({
			title: 'Customer list retrieval failed',
			result: error.response,
		});
	}
};
