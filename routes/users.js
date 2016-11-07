var express = require('express');
var router = express.Router();

var User = require('../models/user') // accessing the variable created in the model

// Register route
router.get('/register', function(req, res){
  res.render('register');
});

// Login router
router.get('/login', function(req, res){
  res.render('login');
});

// Register User
router.post('/register', function(req, res){
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('register',{
          errors:errors
        });
    } else {
        // Creating the user
        var newUser = new User({
            name: name,
            username: username,
            email: email,
            password: password
        });

        // calling create user function in model
        User.createUser(newUser, function(err, user){
            if(err) throw err; // Check for errors
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/users/login');
    }
 });

module.exports = router;
