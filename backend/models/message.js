

var mongoose = require('mongoose');
var messagesSchema = mongoose.Schema(
    {
        user: String,
        post: String
    }
);

//var Messages = mongoose.model('messages', messagesSchema);


mongoose.connect('mongodb://root:root@ds119088.mlab.com:19088/medicart');
var db = mongoose.connection;

var test = "Hello"
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    exports.test= test;
    //exports.Messages =  Messages;
    
});