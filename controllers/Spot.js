'use strict';

var utils = require('../utils/writer.js');
var Spot = require('../service/SpotService');

module.exports.createSpot = function createSpot (_req, res, _next, body) {
  Spot.createSpot(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSpots = function getSpots (__req, res,_next) {
  Spot.getSpots()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modifySpot = function modifySpot (__req, res,_next, body, address, type, charger, id) {
  Spot.modifySpot(body, address, type, charger, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeSpot = function removeSpot (_req, res, _next, id) {
  Spot.removeSpot(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchSpot = function searchSpot (_req, res, _next, address, type, charger) {
  Spot.searchSpot(address, type, charger)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
