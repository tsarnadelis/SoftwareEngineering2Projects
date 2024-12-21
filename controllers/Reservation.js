'use strict';

var utils = require('../utils/writer.js');
var Reservation = require('../service/ReservationService');

module.exports.deleteReservation = function deleteReservation (_, res, next, id) {
  Reservation.deleteReservation(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.makeReservation = function makeReservation (_, res,next, body) {
  Reservation.makeReservation(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modifyReservation = function modifyReservation (_, res, next, body, spotId, userId, startTime, duration, date, id) {
  Reservation.modifyReservation(body, spotId, userId, startTime, duration, date, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};