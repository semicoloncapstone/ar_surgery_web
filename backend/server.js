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
var Simulations = require('./routes/simulation');
var SimHeaders = require('./routes/simHeader');
//oudaAuth
var users = require('./routes/users');
var passwords = require('./routes/passwords');
var roleCodes = require('./routes/roleCodes');
var userRoles = require('./routes/usersRoles');
var rolePermissions = require('./routes/rolePermissions');
var logins = require('./routes/logins');
var roots = require('./routes/roots');
var registrations = require('./routes/registrations');
var classes = require('./routes/class');
var messageBoards = require('./routes/messageBoards');


app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

mongoose.connect('mongodb://root:root@ds119088.mlab.com:19088/medicart', {useMongoClient: true}, function(err){
    if(err) {
        console.log('Some problem with the connection ' +err);
    } else {
        console.log('The connection is ready');
    }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(logger);
app.use('/messages', Messages);
app.use('/simulations', Simulations);
app.use('/simHeaders', SimHeaders);
app.use('/registrations', registrations);
app.use('/classes', classes);
app.use('/messageBoards', messageBoards);
//oudaAuth
app.use('/logins', logins);
app.use('/roots', roots);
app.use('/users', users);
app.use('/passwords', passwords);
app.use('/roleCodes', roleCodes);
app.use('/userRoles', userRoles);
app.use('/rolePermissions', rolePermissions);


app.post('/upload', function(request, response){
    //console.log('entering upload route');
    //var name = request.body.upload.name;
    // create an incoming form object
  var form = new formidable.IncomingForm();
  var fileNameSave = null;
  var collTitle = '';
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');
  
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    
    fileNameSave = file.name;
    
    for(var i=0; i<fileNameSave.length;i++){
        if(fileNameSave[i] == '.'){
            break;
        } else {
            collTitle += fileNameSave[i];
        }
    }
  });
  
  
  form.on('error', function(err) {
    
    console.log('An error has occured: \n' + err);
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    
    
    
    var model = null;
    var xlsx  = './uploads/'+fileNameSave;
 
    mongoXlsx.xlsx2MongoData(xlsx, model, function(err, data) {
        console.log(data);
        
        var db = mongoose.connection;

        db.collection(collTitle).insert(data, function(err, records) {
            if (err) throw err;
        });
        
    });
    response.end('Successfully uploaded file: '+fileNameSave);
  });
  form.parse(request);
});
app.get('/ventricles.csv', function(req, res) {
    res.sendFile('/Users/bencassidy/Projects/ar_surgery_web/backend/ventricles.csv')
});
app.get('/skull.csv', function(req, res) {
    res.sendFile('/Users/bencassidy/Projects/ar_surgery_web/backend/skull.csv')
});
app.get('/brain.csv', function(req, res) {
    res.sendFile('/Users/bencassidy/Projects/ar_surgery_web/backend/brain.csv')
});
app.listen(3700, function () {
    console.log('Server Listening: Port 3700');
});






  