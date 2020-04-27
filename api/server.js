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
const mongoose = require('mongoose');
const customerRouter = require('./routes/customer');
const catalogRouter = require('./routes/catalog');
const orderRouter = require('./routes/order');
const paymentRouter = require('./routes/payment')

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use('/customer', customerRouter);
app.use('/catalog', catalogRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.use('/shopifyCustomer', shopifyCustomerRouter)

app.listen(port, () => console.log(`listening on - http://localhost:${port}`));
