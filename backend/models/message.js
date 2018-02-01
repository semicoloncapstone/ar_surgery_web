var mongoose = require('mongoose');
var messagesSchema = mongoose.Schema(
    {
        user: String,
        post: String
    }
);

var Messages = mongoose.model('messages', messagesSchema);
exports.Model = Messages;

