var express = require('express');
var router = express.Router();
var User = require('../models/user') // accessing the variable created in the model


//GET Dashboard
router.get('/', function(req, res) {
  console.log('admindashroute');
  if(req.user.admin)
  {
     console.log('in if');
     res.render('admindash');
  }
  else {
    console.log('in else');
    res.redirect('dashboard');
  }
});

module.exports = router;
