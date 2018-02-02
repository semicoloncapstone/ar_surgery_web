var express = require('express');
var router = express.Router();
var Messages = require('../models/message');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();


router.route('/').get(parseUrlencoded, parseJSON, function (request, response) {
    Messages.Model.find(function (error, messages) {
        if (error) response.send(error);
        response.json({message: messages});
    });
});

module.exports = router;

