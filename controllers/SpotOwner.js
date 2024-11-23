'use strict';

var utils = require('../utils/writer.js');
var SpotOwner = require('../service/SpotOwnerService');

 

module.exports.addSpotOwner = function(req, res) {
  const {userid,id, name, email, phone, spots } = req.body;
  if (!userid) {
    return res.status(400).json({ message: "Missing required field: userId" });
  }
  SpotOwnerService.addSpotOwner({ userid,id, name, email, phone, spots })
    .then((newSpotOwner) => {
      res.status(200).json(newSpotOwner);  // Return the newly added SpotOwner
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });  // Error handling in case of failure
    });
};

