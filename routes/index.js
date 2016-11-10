var express = require('express');
var router = express.Router();
var Product = require('../models/product')

//GET Homepage
router.get('/', function(req, res, next) {
  Product.find(function(err, items) {
    var productRows = [];
    var rowSize = 3;
    for ( var i = 0; i < items.length; i += rowSize ) {
      productRows.push(items.slice(i, i + rowSize ));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productRows });
  });
});

module.exports = router;
