var express = require('express');
var router = express.Router();
var Registrations = require('./ZZregistration');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');



router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var query = request.query;
        if (query.class){
            Registrations.Model.find({"class": query.class}, function (error,registrations) {
                if (error) response.send(error);
                response.json({registrations: registrations});
            });
        } else if (query.user) {
            Registrations.Model.find({"user": query.user}, function (error,registrations) {
                if (error) response.send(error);
                response.json({registrations: registrations});
            });
        } else {
            Registrations.Model.find(function (error, messages) {
                if (error) response.send(error);
                response.json({registrations: messages});
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
router.route('/:registration_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        Registrations.Model.findById(request.params.registration_id, function (error, role) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({registration: role});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        Registrations.Model.findById(request.params.registration_id, function (error, role) {
            if (error) {
                response.send({error: error});
            }
            else {
                // update the role info
                role.date = request.body.registration.date;
                role.duration = request.body.registration.duration;
                role.type = request.body.registration.type;
                role.class = request.body.registration.class;
                role.user = request.body.registration.user;
                
                role.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({registration: role});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        Registrations.Model.findByIdAndRemove(request.params.registration_id,
            function (error, deleted) {
                if (!error) {
                    response.json({registration: deleted});
                };
            }
        );
    });

module.exports = router;