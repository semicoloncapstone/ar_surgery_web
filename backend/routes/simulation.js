var express = require('express');
var router = express.Router();
var Simulations = require('./ZZsimulation');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');



router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var user = request.query;
        console.log(user.user);
        console.log(user.date);
        if (!user.user){
            Simulations.Model.find(function (error, messages) {
                if (error) response.send(error);
                response.json({simulations: messages});
            });
        }
        else {
            Simulations.Model.find({"user": user.user}, function (error,simulations) {
                if (error) response.send(error);
                
                response.json({simulations: simulations});
            });
        }
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var newSimulation = new Simulations.Model(request.body.simulation);
        newSimulation.save(function (error) {
            if (error) response.send(error);
            response.json({newSimulation: newSimulation});
        });
    });
router.route('/:simulation_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        Simulations.Model.findById(request.params.simulation_id, function (error, role) {
            if (error) {
                response.send({error: error});
            }
            else {
                console.log("Returned a simulation")
                response.json({simulation: role});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        Simulations.Model.findById(request.params.simulation_id, function (error, role) {
            if (error) {
                response.send({error: error});
            }
            else {
                // update the role info
                role.date = request.body.simulation.date;
                role.duration = request.body.simulation.duration;
                role.type = request.body.simulation.type;
                role.class = request.body.simulation.class;
                role.user = request.body.simulation.user;
                
                role.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({simulation: role});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        Simulations.Model.findByIdAndRemove(request.params.simulation_id,
            function (error, deleted) {
                if (!error) {
                    response.json({simulation: deleted});
                };
            }
        );
    });

module.exports = router;