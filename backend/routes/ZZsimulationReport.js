var mongoose = require('mongoose');
var simulationReportSchema = mongoose.Schema(
    {
        date: String,
        score: Number,
        type: String,
        simulation: {type: mongoose.Schema.ObjectId, ref: ('Simulation')},
    }
);

var SimulationReports = mongoose.model('simulation', simulationReportSchema);
exports.Model = SimulationReports;