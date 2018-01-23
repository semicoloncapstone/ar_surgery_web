
var express = require('express');
var mongoose = require('mongoose');
var logger = require('./logger');
var app = express();
var path = require('path');

app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});
app.use(logger);

app.listen(3700, function () {
    console.log('Listening on port 3700');
});