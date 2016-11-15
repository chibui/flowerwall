var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');

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

// add to cart route
router.get('/addToCart/:id', function(req, res, next) {
    var productId = req.params.id;
    // Create the cart , pass old cart if exists, else pass empty object
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    // Use mongoose to find product
    Product.findById(productId, function(err, product) {
      if (err) {
        return res.redirect('/');
      }
      // pass the product and its product id to cart
      cart.add(product, product.id);
      req.session.cart = cart; // save cart to session
      console.log(req.session.cart);
      res.redirect('/');
    });
});

router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
      return res.render('shop/cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  // Passing total price to cart view
  res.render('shop/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;
