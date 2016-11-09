var express = require('express');
var app = express();
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // can sub for oAuth, facebook, google etc
var User = require('../models/user') // accessing the variable created in the model

// Register route
router.get('/register', function(req, res){
  res.render('register');
});

// router.get('/', function(req, res) {
//   res.render()
// })
// Register User
router.post('/register', function(req, res){
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var admin = req.body.admin;

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
            password: password,
            admin: admin
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

 // Login router
 router.get('/login', function(req, res){
   res.render('login');
 });

// Checking username and password against db records using user model
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if(err) throw err;
      if(!user){
          return done(null, false, { message: 'Invalid username/password'});
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
            return done(null, false, { message: 'Invalid username/password'});
        }
      });
    });
  }));

// Create session and establish cookie when logged in, only serialize user.id
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
// passport user auth
 router.post('/login',
  passport.authenticate('local', {sucessRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/dashboard');
  });


// Function to logout
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success_msg', 'You have logged out');
  res.redirect('/users/login');
});


router.route('/')

  .get(function(req, res) {
      User.find(function(err, users){
          if (err)
              res.send(err);
          res.json(users);
      })
  });

  router.route('/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
          if (err)
            res.send(err);
          res.json(user);
        });
    })

    .put(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) throw(error);
          res.send(err);

        user.name = req.body.name;
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.passwordNew = req.body.passwordNew;
        user.password2 = req.body.password2;

        // Validation
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

        User.updateUser(user, function(err, user){
            if(err) throw err; // Check for errors
            console.log(user);
        });

        user.save(function(err) {
          if (err)
            res.send(err);
        });
        req.flash('success_msg', 'Profile updated'); // must be outside of function

      });
    })

    .delete(function(req,res) {
      User.remove({
        _id: req.params.user_id }, function(err,user) {
          if(err) throw(err);
            res.send(err);
          console.log('User deleted');

      });
      req.flash('success_msg', 'User deleted'); // must be outside of function
    })

module.exports = router;
