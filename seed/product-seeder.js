var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect(process.env.FLOWERWALL)

var products = [
  new Product({
    size: '2.4m x 2.4m',
    price: 450,
    category: "583505284f158a27de44956c"
  }),

  new Product({
    size: '2.2m x 2.5m',
    price: 460,
    category: "583505284f158a27de44956d"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 470,
    category: "583505284f158a27de44956e"
  }),

  new Product({
    size: '2m x 2m',
    price: 450,
    category: "583505284f158a27de44956f"
  }),

  new Product({
    size: '2.1m x 1.9m',
    price: 420,
    category: "583505284f158a27de449570"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 470,
    category: "583505284f158a27de449571"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 500,
    category: "583505284f158a27de449572"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 400,
    category: "583505284f158a27de449573"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 500,
    category: "583505284f158a27de449574"
  }),

  new Product({
    size: '2.1m x 1.9m',
    price: 450,
    category: "583505284f158a27de449575"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 470,
    category: "583505284f158a27de449576"
  }),

  new Product({
    size: '2.2m x 2.4m',
    price: 460,
    category: "583505284f158a27de449577"
  })
];

var done = 0;

for (var i = 0; i < products.length; i++) {
  products[i].save(function(err,result) {
    done++;
    if (done === products.length) {
      console.log(products);
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
