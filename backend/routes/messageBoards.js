var express = require('express');
var router = express.Router();
var MessageBoards = require('./ZZmessageBoard');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');



router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var theclass = request.query;
        console.log(theclass.class);
        if (!theclass.class){
            MessageBoards.Model.find(function (error, messages) {
                if (error) response.send(error);
                response.json({messageBoards: messages});
            });
        }
        else {
            MessageBoards.Model.find({"class": theclass.class}, function (error, messages) {
                if (error) response.send(error);
                response.json({messageBoards: messages});
            });
        }
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var newMessageBoard = new MessageBoards.Model(request.body.messageBoard);
        newMessageBoard.save(function (error) {
            if (error) response.send(error);
            response.json({newMessageBoard: newMessageBoard});
        });
    });

router.route('/:messageBoard_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        MessageBoards.Model.findById(request.params.messageBoard_id, function (error, role) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({messageBoard: role});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        MessageBoards.Model.findById(request.params.messageBoard_id, function (error, role) {
            if (error) {
                response.send({error: error});
            }
            else {
                // update the role info
                role.class = request.body.messageBoard.class;
                role.capacity = request.body.messageBoard.capacity;
                role.type = request.body.messageBoard.type;

                role.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({messageBoard: role});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        MessageBoards.Model.findByIdAndRemove(request.params.messageBoard_id,
            function (error, deleted) {
                if (!error) {
                    response.json({messageBoard: deleted});
                };
            }
        );
    });
module.exports = router;