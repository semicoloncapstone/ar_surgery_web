var mongoose = require('mongoose');
var simulationSchema = mongoose.Schema(
    {
        date: String,
        user: {type: mongoose.Schema.ObjectId, ref: ('Users')},
        target: {
            position: [Number],
            orientiation: [Number],
            time: Number,
            inSkull: Boolean
        },
        truepath: [Number],
        toolPoints: [{
            position: [Number],
            orientiation: [Number],
            time: Number,
            inSkull: Boolean
        }],
        headPoints: [{
            position: [Number],
            orientiation: [Number],
            time: Number,
            inSkull: Boolean
        }],
        timeOut: Boolean,
        debugged: Boolean
        
    }
);

var Simulations = mongoose.model('simulation', simulationSchema);
exports.Model = Simulations;