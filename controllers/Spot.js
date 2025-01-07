'use strict';

var utils = require('../utils/writer.js');
var Spot = require('../service/SpotService');

//Function to handle creating a new spot
module.exports.createSpot = function createSpot (_, res, __, body) {
  Spot.createSpot(body)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};

//Function to handle retrieving all spots
module.exports.getSpots = function getSpots (_, res,__){
  Spot.getSpots()
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};

//Function to handle modifying an existing parking spot
module.exports.modifySpot = function modifySpot (_, res,__, body, address, type, charger, id)  {
  Spot.modifySpot(body, address, type, charger, id)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};

// Function to handle removing a parking spot
module.exports.removeSpot = function removeSpot (_, res, __, id) {
  Spot.removeSpot(id)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};

//Function to handle searching for a parking spot
module.exports.searchSpot = function searchSpot (_, res, __, address, type, charger) {
  Spot.searchSpot(address, type, charger)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};