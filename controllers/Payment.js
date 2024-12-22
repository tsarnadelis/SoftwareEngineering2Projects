'use strict';

var utils = require('../utils/writer.js');
var Payment = require('../service/PaymentService');

//Function to handle making a payment
module.exports.makePayment = function makePayment (_ ,res,__, body) {
  Payment.makePayment(body)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};