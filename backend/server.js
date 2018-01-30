var express = require('express'); 
var mongoose = require('mongoose');
var app = express(); 
var logger = require('./logger');
mongoose.connect('mongodb://root:root@ds119088.mlab.com:19088/medicart');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});
app.use(logger);

app.listen(3700, function () {
    console.log('Server Listening: Port 3700');
});
