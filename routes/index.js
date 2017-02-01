var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var Category = require('../models/category');
var Client = require('../models/client');
var findClients = require('../config/client');


/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  var categoryRows = [];

  Category.find(function(err,items) {
    var categoryRows = [];
    var rowSize = 3;
    for ( var i = 0; i < items.length; i += rowSize) {
      categoryRows.push(items.slice(i, i + rowSize));
    }  // Render shop index and flash message handling

    res.render('shop/index', { title: 'The Flowerwall', category: categoryRows, successMsg: successMsg, noMessages: !successMsg});
  });


// figure out how to do async in get
  // Client.find(function(err,clients) {
  //   var clientRows = [];
  //   var rowSize = 6;
  //   for ( var i = 0; i < clients.length; i += rowSize) {
  //     clientRows.push(clients.slice(i, i + rowSize));
  //   }
  //   res.render('shop/index', { title: 'The Flowerwall', client: clientRows, category: this.categoryRows, uccessMsg: successMsg, noMessages: !successMsg});
  // })
});

// GET products in category.

router.get('/products/:id', function(req, res, next) {
  var categoryId = req.params.id;
  var successMsg = req.flash('success')[0];
    Product.find( {category: categoryId} ,function(err, items) {
      var productRows = [];
      var rowSize = 3;
      for (var i = 0; i < items.length; i += rowSize) {
          productRows.push(items.slice(i, i + rowSize));
        }
      Category.findById(categoryId, function(err, category){
        res.render('shop/products', {title: category.title, products: productRows, successMsg: successMsg, noMessages: !successMsg, category: category});
      });
    });
});

// add to cart route
router.get('/addToCart/:id', function(req, res, next) {
    var productId = req.params.id;
    // Create the cart , pass old cart if exists, else pass empty object
    var cart = new Cart(req.session.cart ? req.session.cart : {});


    Product.findById(productId)
    .populate('category') // Find the category object from the object id using populate
    .exec(function(err, product) {
      if (err) {
        return res.redirect('/');
      }
      // pass the product and its product id to cart and also the whole of category for the title.
      cart.add(product, product.id, product.category);
      req.session.cart = cart; // save cart to session
      console.log(req.session.cart);
      res.redirect('/');
    });
});

// reduce by 1 from cart routes
router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id;
  //turnery for request cart if cart is a empty object
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

// remove from cart routes
router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

// Cart routes
router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
      return res.render('shop/cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  // Passing total price to cart view
  res.render('shop/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

// Checkout route
router.get('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
      return res.redirect('/cart');
  }
  var cart = new Cart(req.session.cart);
  //store multiple errors into an array (connect-flash) and accessing the first
  var errMsg = req.flash('error')[0];
  // Passing total price to checkout view
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});

});

router.post('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
      return res.redirect('/cart');
  }
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")(
    "sk_test_TIjO1CYDCL43z2uMhIPanco6"
  );

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "aud",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test charge"
  }, function(err, charge) {
    // asynchronously called
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function(err, result) {
      // handle error
      req.flash('success', 'Deposit successful');
      req.session.cart = null;
      res.redirect('/');
    });
  });
});

// contact form routes
router.get('/contact', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  res.render('shop/contact', { title: 'Contact Us', successMsg: successMsg, noMessages: !successMsg });
});

// FAQ routes
router.get('/faq', function(req, res, next) {
  var successMsg = req.flash('sucess')[0];
  res.render('shop/faq', { title: 'Frequently Asked Questions', successMsg: successMsg, noMessages: !successMsg });
});



module.exports = router;

// Check if user logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/login');
}
