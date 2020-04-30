require('../models/shopifyCustomerModel');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customers');

dotenv.config();

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET_KEY = process.env.SHOPIFY_API_SECRET_KEY;
const API_VERSION = process.env.API_VERSION;
const STORE_NAME = process.env.STORE_NAME;


var http = require("https");

var options = {
  "method": "POST",
  "hostname": [
    STORE_NAME,
    "myshopify",
    "com"
  ],
  "path": [
    "admin",
    "api",
    "2020-01",
    "customers.json"
  ],
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": `Basic {SHOPIFY_API_SECRET_KEY}`,
    "cache-control": "no-cache",
    "Postman-Token": SHOPIFY_API_KEY
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ customer: 
    { first_name: 'Steve',
      last_name: 'Lastnameson',
      email: 'steve.lastnameson@example.com',
      phone: '+15142546011',
      verified_email: true,
      addresses: 
       [ { address1: '123 Oak St',
           city: 'Ottawa',
           province: 'ON',
           phone: '555-1212',
           zip: '123 ABC',
           last_name: 'Lastnameson',
           first_name: 'Mother',
           country: 'CA' } ] } }));
req.end();