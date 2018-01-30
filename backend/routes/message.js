var express = require('express');
var router = express.Router();
var models = require('../models/message');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();
var mongoose = require('mongoose');


router.route('/').get(parseUrlencoded, parseJSON, function (request, response) { 
    Messages.find(function (error, messages) {
    if (error) response.send(error);
    response.json({message: messages});
    });
});

