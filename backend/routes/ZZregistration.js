var mongoose = require('mongoose');
var registrationSchema = mongoose.Schema(
    {
        date: String,
        duration: Number,
        type: String,
        class: {type: mongoose.Schema.ObjectId, ref: ('Class')},
        user: {type: mongoose.Schema.ObjectId, ref: ('Users')},
    }
);

var Registrations = mongoose.model('registration', registrationSchema);
exports.Model = Registrations;