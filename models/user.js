var mongoose = require('mongoose');
var bcrypt = require('bcrypt.js');

mongoose.connect('mongodb://localhost/loginapp') // Point to db

var db = mongoose.connection;
