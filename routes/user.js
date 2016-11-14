var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

// Register Routes
router.get('/register', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/register',
  failureFlash: true
}));

// Login Routes
router.get('/login', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/login', {csrfToken:req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash:true
}));

// Profile Routes
router.get('/profile', function(req, res, next) {
  res.render('user/profile');
});

module.exports = router;
