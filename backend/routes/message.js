var express = require('express');
var router = express.Router();
var Messages = require('../models/message');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

// Home page route.
router.get('/messages', function (req, res) {
  res.send('Response recieved');
})

module.exports = router;

