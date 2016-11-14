var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

// Profile Routes
router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('user/profile');
});

// Logout Route
router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  res.redirect('/');
});

// Blocks below routes from signed in user
router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

// Register Routes
router.get('/register', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/register', passport.authenticate('local.register', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/register',
  failureFlash: true
}));

// Login Routes
router.get('/login', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/login', {csrfToken:req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/login', passport.authenticate('local.login', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/login',
  failureFlash:true
}));



module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
