var mongoose = require('mongoose');
var messageBoardSchema = mongoose.Schema(
    {
        type: String,
        capacity: Number,
        class: {type: mongoose.Schema.ObjectId, ref: ('Class')},
    }
);

var MessageBoards = mongoose.model('messageBoard', messageBoardSchema);
exports.Model = MessageBoards;