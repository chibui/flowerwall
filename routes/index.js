var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err,items) {
      var productRows = [];
      var rowSize = 3;
      for ( var i = 0; i < items.length; i += rowSize) {
        productRows.push(items.slice(i, i + rowSize));
      }
      res.render('shop/index', { title: 'Shop', products: productRows });
  });
});

// Register Routes
router.get('/user/register', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/user/register', passport.authenticate('local-register', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/register',
  failureFlash: true
}));


// Login Routes
router.get('/user/login', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/login', {csrfToken:req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/user/login', passport.authenticate('local-login', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/login',
  failureFlash:true
}));

// Profile Routes
router.get('/user/profile', function(req, res, next) {
  res.render('user/profile');
});

module.exports = router;
