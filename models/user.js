var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User schema

var UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        index: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean
    }
});

// creating variable to access outside this file
var User = module.exports = mongoose.model('User', UserSchema);

// User functions
module.exports.createUser = function(newUser, callBack){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callBack);
        });
    });
}

module.exports.updateUser = function(user, callBack){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            user.save(callBack);
        });
    });
}

// function to do query on database against username that was entered
module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
}

// function to do query to find a username by id
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

// Function to compare password against user password in db
module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err,isMatch) {
      if(err) throw err;
      callback(null, isMatch);
  });
}

// Function to check if logged in

module.exports.ensureAuthenticated = function(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', "You are not logged in")
    res.redirect('/users/login');
  };
}

module.exports.ensureAdmin = function(req, res, next) {
  if(req.isAdmin(user.admin === true )){
    return next();
  } else {
    req.flash('error_msg', "You are not logged in")
    res.redirect('/users/login');
  };
}
