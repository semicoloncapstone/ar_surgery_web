var mongoose = require('mongoose');
var userNameSchema = mongoose.Schema(
    {
        userName: String,
    }
);

var UserName = mongoose.model('userName', userNameSchema);
exports.Model = UserName;