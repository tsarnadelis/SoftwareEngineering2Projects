'use strict';

var utils = require('../utils/writer.js');
var SpotOwner = require('../service/SpotOwnerService');

module.exports.addSpotOwner = function addSpotOwner (_req, res, _next, body) {
  SpotOwner.addSpotOwner(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};