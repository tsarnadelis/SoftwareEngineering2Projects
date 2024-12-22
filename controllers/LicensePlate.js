'use strict';

var utils = require('../utils/writer.js');
var LicensePlate = require('../service/LicensePlateService');

// Function to handle modifying a license plate
module.exports.modifyPlate = function modifyPlate (req, res, next, body) {
  LicensePlate.modifyPlate(body)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};

//Function to handle registering a new license plate
module.exports.registerPlate = function registerPlate (req, res, next, body) {
  LicensePlate.registerPlate(body)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};