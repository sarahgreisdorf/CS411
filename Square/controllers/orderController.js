require('../models/orderModel');
const squareConnect = require('square-connect');
const dotenv = require('dotenv');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Order = mongoose.model('Orders');

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;

// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;
const orders_api = new squareConnect.OrdersApi();
const locationId = process.env.LOCATION_ID;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';

exports.create_order = async function (req, res) {
	const idempotencyKey = crypto.randomBytes(22).toString('hex');
	const request_body = {
		// location_id: locationId,
		idempotency_key: idempotencyKey,
		customer_id: req.body.customerId,
		line_items: [
			{
				catalog_object_id: req.body.variationId,
				quantity: req.body.quantity,
			},
		],
	};
	try {
		const response = await orders_api.createOrder(locationId, request_body);
		const new_order = new Order({
			...response.order,
			order_id: response.order.id,
		})
		await new_order.save(function(error) {
			if(error) res.send(error);
		});
		res.send(response);
	} catch (error) {
		res.status(500).send(error);
	}
};
