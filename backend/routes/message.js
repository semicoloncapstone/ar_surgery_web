var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');
var messagesSchema = mongoose.Schema(
    {
        sender: {type: mongoose.Schema.ObjectId, ref: ('Users')},
        reciever: {type: mongoose.Schema.ObjectId, ref: ('Users')},
        messageBoard: {type: mongoose.Schema.ObjectId, ref: ('MessageBoards')},
        date: String,
        header: String,
        body: String,
        type: String,
    }
);

var Messages = mongoose.model('messages', messagesSchema);

router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var query = request.query;
        if (query.sender)
        {
            Messages.find({"sender": query.sender}, function (error, messages) {
                if (error) response.send(error);
                response.json({msg: messages});
            });
        }
        else if (query.reciever)
        {
            Messages.find({"reciever": query.reciever}, function (error, messages) {
                if (error) response.send(error);
                response.json({msg: messages});
            });
        }
        else if (query.messageBoard)
        {
            Messages.find({"messageBoard": query.messageBoard}, function (error, messages) {
                if (error) response.send(error);
                response.json({msg: messages});
            });
        }
        else {
            Messages.find(function (error, messages) {
                if (error) response.send(error);
                response.json({msg: messages});
            });
        }
       
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var newMessage = new Messages(request.body.message);
        newMessage.save(function (error) {
            if (error) response.send(error);
            response.json({newMessage: newMessage});
        });
    });

router.route('/:message_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        Messages.Model.findById(request.params.message_id, function (error, role) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({message: role});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        Messages.Model.findById(request.params.message_id, function (error, role) {
            if (error) {
                response.send({error: error});
            }
            else {
                // update the role info
                role.messageBoard = request.body.message.messageBoard;
                role.sender = request.body.message.sender;
                role.reciever = request.body.message.reciever;
                role.date = request.body.message.date;
                role.header = request.body.message.header;
                role.body = request.body.message.body;
                role.type = request.body.message.type;
                
                role.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({message: role});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        Messages.Model.findByIdAndRemove(request.params.message_id,
            function (error, deleted) {
                if (!error) {
                    response.json({message: deleted});
                };
            }
        );
    });
module.exports = router;

