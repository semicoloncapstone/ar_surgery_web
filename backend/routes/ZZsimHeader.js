var mongoose = require('mongoose');
var simHeaderSchema = mongoose.Schema(
    {
        uName: String,
        date: String,
        simulaionDuration: Number,
        
    }
);

var SimHeaders = mongoose.model('simHeader', simHeaderSchema);
exports.Model = SimHeaders;