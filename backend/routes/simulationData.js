var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');
/*var simulationSchema = mongoose.Schema(
    {
        user: String,//will be a reference to user later
        date: Date,
        toolPoints: [{xpos: Number, ypos: Number,zpos: Number,
            quat1: Number,quat2: Number,quat3: Number,quat4: Number,
            timeStamp: Number}],
        headPoints: [{xpos: Number, ypos: Number,zpos: Number,
            quat1: Number,quat2: Number,quat3: Number,quat4: Number,
            timeStamp: Number}],
        target: {xpos: Number, ypos: Number,zpos: Number,
            quat1: Number,quat2: Number,quat3: Number,quat4: Number, timeStamp: Number}
    }
);

var Simulation = mongoose.model('simulation', simulationSchema);

router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
       Simulation.find(function (error, simulations) {
            if (error) response.send(error);
            response.json({simulations: simulations});
        });
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        console.log(request.body.simulation);
        
        var newSimulation = new Simulation(request.body.simulation);
        newSimulation.date = new Date();
        newSimulation.toolPoints= request.body.simulation.toolPoints;
        newSimulation.headPoints= request.body.simulation.headPoints;   
        newSimulation.target = request.body.simulation.target;
        newSimulation.user= request.body.simulation.user;
        newSimulation.save(function (error) {
            if (error) response.send(error);
            response.json({newSimulation: newSimulation});
        });
        
    });

module.exports = router;*/