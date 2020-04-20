const squareConnect = require('square-connect');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;

// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;
const payments_api = new squareConnect.PaymentsApi();

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';

exports.pay_order = async function(req, res) {
  const request_params = req.body;
  const idempotency_key = crypto.randomBytes(22).toString('hex');
  
  const request_body = {
		source_id: request_params.nonce,
		amount_money: {
			amount: request_params.amount, // $1.00 charge
			currency: 'USD',
    },
    order_id: request_params.orderId,
		idempotency_key: idempotency_key,
	};

	try {
		const response = await payments_api.createPayment(request_body);
		res.status(200).json({
			title: 'Payment Successful',
			result: response,
		});
	} catch (error) {
		res.status(500).json({
			title: 'Payment Failure',
			result: error.response.text,
		});
	}
}