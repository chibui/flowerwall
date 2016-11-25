var Product = require('../models/product');
var mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect(process.env.FLOWERWALL)


var products = [
  new Product({
    size: '2.4m x 2.4m',
    price: 450,
    category: "58355a3475bf0d1b91f79f2d"
  }),

  new Product({
    size: '2.2m x 2.5m',
    price: 460,
    category: "58355a3475bf0d1b91f79f2e"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 470,
    category: "58355a3475bf0d1b91f79f2f"
  }),

  new Product({
    size: '2.0m x 2.0m',
    price: 450,
    category: "58355a3475bf0d1b91f79f30"
  }),

  new Product({
    size: '2.1m x 1.9m',
    price: 420,
    category: "58355a3475bf0d1b91f79f31"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 470,
    category: "58355a3475bf0d1b91f79f32"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 500,
    category: "58355a3475bf0d1b91f79f33"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 400,
    category: "58355a3475bf0d1b91f79f34"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 500,
    category: "58355a3475bf0d1b91f79f35"
  }),

  new Product({
    size: '2.1m x 1.9m',
    price: 450,
    category: "58355a3475bf0d1b91f79f36"
  }),

  new Product({
    size: '2.4m x 2.4m',
    price: 470,
    category: "58355a3475bf0d1b91f79f37"
  }),

  new Product({
    size: '2.2m x 2.4m',
    price: 460,
    category: "58355a3475bf0d1b91f79f38"
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
