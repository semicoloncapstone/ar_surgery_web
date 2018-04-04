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
        console.log(query);
        if (query.sender && query.reciever){
            var allMess = [];
            console.log('Getting Sender/Reciever');
            Messages.find({"sender": {$in: [query.sender, query.reciever]}, "reciever": {$in: [query.sender, query.reciever]}}, function(error, messages){
                if (error) response.send(error);
                for (var i=0; i<messages.length; i++){
                    if (messages[i].sender != messages[i].reciever){
                        allMess.push(messages[i]);
                    }
                }
                response.json({message: allMess});
            });
            /*Messages.find({"sender": query.sender, "reciever": query.reciever}, function (error, ssrr) {
                if (error) response.send(error);
                //response.json({message: messages});
                for (var i=0; i<ssrr.length; i++){
                    allMess.push(ssrr[i]);
                }
            }).then(Messages.find({"sender": query.reciever, "reciever": query.sender}, function (error, messages) {
                if (error) response.send(error);
                for (var i=0; i<messages.length; i++){
                    allMess.push(messages[i]);
                }
                response.json({message: allMess});
            }));*/
        }
        else if (query.reciever)
        {
            console.log('Getting Reciever');
            Messages.find({"reciever": query.reciever}, function (error, messages) {
                if (error) response.send(error);
                response.json({message: messages});
            });
        }
        else if (query.messageBoard)
        {
            console.log('Getting Board');
            Messages.find({"messageBoard": query.messageBoard}, function (error, messages) {
                if (error) response.send(error);
                response.json({message: messages});
            });
        }
        else if (query.sender)
        {
            console.log('Getting Sender');
            Messages.find({"sender": query.sender}, function (error, messages) {
                if (error) response.send(error);
                response.json({message: messages});
            });
        }
        else {
            console.log('Getting Other');
            Messages.find(function (error, messages) {
                if (error) response.send(error);
                response.json({message: messages});
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

