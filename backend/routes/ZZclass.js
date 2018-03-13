var mongoose = require('mongoose');
var classSchema = mongoose.Schema(
    {
        className: String,
        classSize: Number,
        program: String,
        programDesc: String,
        school: String,
        schoolDesc: String,
        teacher: {type: mongoose.Schema.ObjectId, ref: ('Users')},
    }
);

var Class = mongoose.model('class', classSchema);
exports.Model = Class;