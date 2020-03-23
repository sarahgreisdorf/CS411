var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// square API call
var request = require('request');

var headers = {
  'Square-Version': '2020-02-26',
  'Authorization': 'Bearer EAAAEJjyXlfDL2-t1orezDkUj7BwErQonoWlzp9Ws2BMGo7lhTd2gLd8bPHUwYZI',
  'Content-Type': 'application/json'
};

var options = {
  url: 'https://connect.squareupsandbox.com/v2/payments?begin_time=2020-01-26T02%3A25%3A34Z&end_time=2020-05-26T02%3A25%3A34Z',
  headers: headers
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);

    router.get('/', function(req, res, next) {
      res.render('index', { payments: body });
    });
  }
}

request(options, callback);
let bod = "hmm";



module.exports = router;
