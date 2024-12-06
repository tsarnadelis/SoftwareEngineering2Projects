'use strict';

var utils = require('../utils/writer.js');
var LicensePlate = require('../service/LicensePlateService');

module.exports.modifyPlate = function modifyPlate (req, res, next, body) {
  LicensePlate.modifyPlate(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerPlate = function registerPlate (req, res, next, body) {
  LicensePlate.registerPlate(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};