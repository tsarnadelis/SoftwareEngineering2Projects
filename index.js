'use strict';

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

const { NODE_ENV, /*PORT*/ } = process.env; // Uncomment PORT if you want to use it

// Initialize the Express app first
var express = require('express');
var app = express();

// 1. Define custom routes (e.g., root) before Swagger middleware
app.get('/', function(req, res) {
    res.send("Welcome to CurbSprings application\nYour reliable partner in urban mobility");
});

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
app = expressAppConfig.getApp();

// Initialize the Swagger middleware
if (NODE_ENV !== "test") {
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
}

module.exports = app;
