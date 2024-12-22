'use strict';

var utils = require('../utils/writer.js');
var Reservation = require('../service/ReservationService');

// Function to handle deleting a reservation
module.exports.deleteReservation = function deleteReservation (_, res, __, id) {
  Reservation.deleteReservation(id)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};

//Function to handle making a reservation
module.exports.makeReservation = function makeReservation (_, res,__, body) {
  Reservation.makeReservation(body)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};

//Function to handle modifying a reservation
module.exports.modifyReservation = function modifyReservation (_, res, __, body, spotId, userId, startTime, duration, date, id) {
  Reservation.modifyReservation(body, spotId, userId, startTime, duration, date, id)
    .then(function (response) {
      // Write the response using the utility function
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write the error response using the utility function
      utils.writeJson(res, response);
    });
};