var express = require('express');
var router = express.Router();
var Classes = require('./ZZclass');
var Registrations = require('./ZZregistration');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');



router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var user = request.query;
        
        if (user.user == null){
            Classes.Model.find(function (error, messages) {
                if (error) response.send(error);
                response.json({classes: messages});
            });
        }
        else {
            Registrations.Model.find({"user": user.user}, function (error,registrations) {
                if (error) response.send(error);
                
                var idArray = [];
                //response.json({registrations: registrations});
                for(var i =0; i<registrations.length; i++)
                {
                    
                    idArray.push(registrations[i].class);
                }
                console.log(idArray);
                Classes.Model.find({_id : {$in : idArray}}, function (error, messages) {
                    
                    if (error) response.send(error);
                    response.json({classes: messages});
                });
            });
        }
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var newclass = new Classes.Model(request.body.class);
        newclass.save(function (error) {
            if (error) response.send(error);
            var newRegistration = new Registrations.Model();
            var d = new Date();
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            newRegistration.date= months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
            newRegistration.duration = 7;
            newRegistration.type = "Teacher";
            newRegistration.class = newclass._id;
            newRegistration.user=newclass.teacher;
            newRegistration.save(function (error){
                response.json({class: newclass});
            });
            
        });
    });

router.route('/:class_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        Classes.Model.findById(request.params.class_id, function (error, theclass) {
            if (error) response.send(error);
            response.json({class: theclass});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        Classes.Model.findById(request.params.class_id, function (error, theclass) {
            if (error) {
                response.send({error: error});
            }
            else {
                theclass.className = request.body.class.className;
                theclass.classSize = request.body.class.classSize;
                theclass.school = request.body.class.school;
                theclass.program = request.body.class.program;
                theclass.teacher = request.body.class.teacher;
                
                theclass.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({class: theclass});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        console.log('deleting class');
        
       Classes.Model.findByIdAndRemove(request.params.class_id,
            function (error, deleted) {
                if (!error) {
                    response.json({class: deleted});
                }
            }
        );
    });
module.exports = router;