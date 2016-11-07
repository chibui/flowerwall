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
