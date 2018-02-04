var express = require('express'); 
var mongoose = require('mongoose');
var app = express(); 
var logger = require('./logger');
var xlsx = require("node-xlsx").default;
var mongoXlsx = require("mongo-xlsx");
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var Messages = require('./routes/message');
var Simulations = require('./routes/simulationData');

app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

/*mongoose.connect('mongodb://root:root@ds119088.mlab.com:19088/medicart', {useMongoClient: true}, function(err){
    if(err) {
        console.log('Some problem with the connection ' +err);
    } else {
        console.log('The connection is ready');
    }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));*/

app.use(logger);
app.use('/messages', Messages);
app.use('/simulationData', Simulations);
app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(3700, function () {
    console.log('Server Listening: Port 3700');
});






  