/*
  Copyright 2019 Square Inc.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mongoose = require('mongoose');
const squareConnect = require('square-connect');
const customerRouter = require('./routes/customer');
const Customer = require('./models/customerModel');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/cs411', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Database is connected!');
});

// Set the Access Token
const accessToken = process.env.ACCESS_TOKEN;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use('/customer', customerRouter);

// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';

app.post('/process-payment', async (req, res) => {
	const request_params = req.body;

	// length of idempotency_key should be less than 45
	const idempotency_key = crypto.randomBytes(22).toString('hex');

	// Charge the customer's card
	const payments_api = new squareConnect.PaymentsApi();
	const request_body = {
		source_id: request_params.nonce,
		amount_money: {
			amount: 100, // $1.00 charge
			currency: 'USD',
		},
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
});

app.listen(port, () => console.log(`listening on - http://localhost:${port}`));
