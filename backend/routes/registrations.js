var express = require('express');
var router = express.Router();
var Registrations = require('./ZZregistration');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');



router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var user = request.query;
        if (!user){
            Registrations.Model.find(function (error, messages) {
                if (error) response.send(error);
                response.json({registrations: messages});
            });
        }
        else {
            Registrations.Model.find({"user": user.user}, function (error,registrations) {
                if (error) response.send(error);
                response.json({registrations: registrations});
            });
        }
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var newRegistration = new Registrations.Model(request.body.registration);
        newRegistration.save(function (error) {
            if (error) response.send(error);
            response.json({newRegistration: newRegistration});
        });
    });

module.exports = router;