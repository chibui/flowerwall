var express = require('express');
var router = express.Router();

//GET Homepage
router.get('/', function(req, res) {
  res.render('shop/index');
});

module.exports = router;
