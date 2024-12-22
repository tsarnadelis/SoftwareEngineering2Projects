'use strict';

var utils = require('../utils/writer.js');
var Spot = require('../service/SpotService');

module.exports.createSpot = function createSpot (_, res, __, body) {
  Spot.createSpot(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSpots = function getSpots (_, res,__){
  Spot.getSpots()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modifySpot = function modifySpot (_, res,__, body, address, type, charger, id)  {
  Spot.modifySpot(body, address, type, charger, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeSpot = function removeSpot (_, res, __, id) {
  Spot.removeSpot(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchSpot = function searchSpot (_, res, __, address, type, charger) {
  Spot.searchSpot(address, type, charger)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};