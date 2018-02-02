var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessagesSchema = new Schema({
    user: String,
    post: String
});

var Messages = mongoose.model('Messages', MessagesSchema);
module.exports = Messages;
