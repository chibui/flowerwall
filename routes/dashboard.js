var express = require('express');
var router = express.Router();
var User = require('../models/user') // accessing the variable created in the model


//GET Dashboard
router.get('/', ensureAuthenticated, function(req, res) {
  if(req.user.admin) {
    console.log('dashroute')

    res.render('admindash');
  } else {
    res.render('dashboard');
  }
  // console.log('test');
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', "You are not logged in")
    res.redirect('/users/login');
  }
};

module.exports = router;
