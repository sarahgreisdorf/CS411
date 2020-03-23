# CS411
CS411 Project Spring 2020

# Customer Payment Simulation

This website takes you through an entire walkthrough of creating a Square developer account
and creating a basic Square payment app. The link specifically brings you to the step where 
you input the sample credit card.

https://developer.squareup.com/docs/payment-form/payment-form-walkthrough#23-test-the-payment-flow-from-client-to-server

The folder "sqpaymentform-nodejs-starterkit-master" contains my version of the walkthrough 
code. It is linked to my Square developer account, so any sample payments conducted will 
be stored in my account payment history. At the time of writing this, I have done two sample 
payments.

# Making API call to retrieve transaction history

The code for this is stored in the folder "prototype." The Square developer site provides an 
API call generator (under "API Explorer"). I created the call in cURL, then translated it to 
JavaScript. This API call can be found in routes/index.js.

What results is a JSON object containing an array of payment objects.