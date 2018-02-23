var express = require('express');
var router = express.Router();
var Classes = require('./ZZclass');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');



router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        
        Classes.Model.find(function (error, messages) {
            if (error) response.send(error);
            response.json({classes: messages});
        });
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var newclass = new Classes.Model(request.body.class);
        newclass.save(function (error) {
            if (error) response.send(error);
            response.json({newclass: newclass});
        });
    });

router.route('/:class_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        Classes.Model.findById(request.params.class_id, function (error, theclass) {
            if (error) response.send(error);
            response.json({theclass: theclass});
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
                        response.json({theclass: theclass});
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
                    response.json({theclass: deleted});
                }
            }
        );
    });
module.exports = router;