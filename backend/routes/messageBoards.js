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
        if (!theclass){
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

module.exports = router;