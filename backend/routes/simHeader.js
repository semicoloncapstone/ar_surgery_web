var express = require('express');
var router = express.Router();
var SimHeaders = require('./ZZsimHeader');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');



router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var user = request.query;
        
        if (!user.uName){
            SimHeaders.Model.find(function (error, messages) {
                if (error) response.send(error);
                response.json({simHeaders: messages});
            });
        }
        else {
            SimHeaders.Model.find({"uName": user.uName}, function (error,simHeaders) {
                if (error) response.send(error);
                console.log('in username');
                response.json({simHeaders: simHeaders});
            });
        }
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var newSimHeader = new SimHeaders.Model(request.body.simHeader);
        newSimHeader.save(function (error) {
            if (error) response.send(error);
            response.json({newSimHeader: newSimHeader});
        });
    });
router.route('/:simHeader_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        SimHeaders.Model.findById(request.params.simHeader_id, function (error, role) {
            if (error) {
                response.send({error: error});
            }
            else {
                console.log("Returned a simHeader")
                response.json({simHeader: role});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        SimHeaders.Model.findById(request.params.simHeader_id, function (error, role) {
            if (error) {
                response.send({error: error});
            }
            else {
                // update the role info
                role.date = request.body.simHeader.date;
                role.duration = request.body.simHeader.duration;
                role.type = request.body.simHeader.type;
                role.class = request.body.simHeader.class;
                role.user = request.body.simHeader.user;
                
                role.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({simHeader: role});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        SimHeaders.Model.findByIdAndRemove(request.params.simHeader_id,
            function (error, deleted) {
                if (!error) {
                    response.json({simHeader: deleted});
                };
            }
        );
    });

module.exports = router;