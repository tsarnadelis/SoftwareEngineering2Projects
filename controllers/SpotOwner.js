'use strict';

var utils = require('../utils/writer.js');
var SpotOwner = require('../service/SpotOwnerService');

//Function to handle adding a new spot owner
module.exports.addSpotOwner = function addSpotOwner (req, res, next, body) {
  SpotOwner.addSpotOwner(body)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};