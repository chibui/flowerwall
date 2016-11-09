var express = require('express');
var router = express.Router();

//GET Dashboard
router.get('/', ensureAdmin, function(req, res) {
  res.render('admindash');
  // console.log('test');
});

function ensureAdmin(req, res, next) {
  if(req.isAdmin ()){
    return next();
  } else {
    req.flash('error_msg', "You are not logged in")
    res.redirect('/users/login');
  }
};

module.exports = router;
