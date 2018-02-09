var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');
var messagesSchema = mongoose.Schema(
    {
        user: String,
        post: String
    }
);

var Messages = mongoose.model('messages', messagesSchema);

router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
       Messages.find(function (error, messages) {
            if (error) response.send(error);
            response.json({msg: messages});
        });
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var newMessage = new Messages(request.body.message);
        newMessage.save(function (error) {
            if (error) response.send(error);
            response.json({newMessage: newMessage});
        });
    });

module.exports = router;

