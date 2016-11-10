var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginapp'); //connecting to database


var products = [
  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2016/09/ivoryflowerwall-1350x900.jpg',
    title: 'Ivory Bliss',
    description: "Our heaven on earth 9.6m Ivory flower wall is Sydney's largest flower wall, making it's debut at the first ever Vera Wang Bridal showcase in Sydney!",
    size: '2.4m x 2.4m',
    price: 450,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2015/08/2016-10-16-74072C-1350x900.jpg',
    title: 'Wisteria',
    description: 'Celebrate your special event with our our gorgeous, cascading blooms of wisteria, up to 6m long!',
    size: '2.2m x 2.5m',
    price: 460,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2016/08/2016-8-13-74078C-1024x683.jpg',
    title: 'Eliza',
    description: "Making it's first debut at the Sydney Opera House for the cast announcement of \"my Fair Lady\" by Dame Julie Andrews, we are proud to have Eliza in our exquisite collection of walls.",
    size: '2.4m x 2.4m',
    price: 470,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2015/08/12194502_1502943426667990_550757491660103394_o-1024x728.jpg',
    title: 'Classic Ivory',
    description: "The flowers wall's most wanted is our Classic Ivory flower wall! A deluxe selection of ivory, and white roses, mixed with hydrangeas and babies breaths, she creates a magical ambience bringing lovers together.",
    size: '2m x 2m',
    price: 450,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2014/11/MG_3847-1024x683.jpg',
    title: 'Bold Pink',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    size: '2.1m x 1.9m',
    price: 420,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2016/10/Amazing-Amazonia-675x900.jpg',
    title: 'Amazing Amazonia',
    description: 'Our "Amazing Amazonia" Flower wall inspired by the beauty and lushness of the Amazon forest.',
    size: '',
    price: 470,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2015/08/pink-flowerwalls-900x900.jpg',
    title: 'Perfectly Pink',
    description: 'OWe are in love with our Perfectly Pink flower wall filled with a deluxe combination of peonies and roses blooming with opulence, this gorgeous piece of heaven will surely steal your heart!',
    size: '',
    price: 500,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2016/08/greenflowerwall-675x900.jpg',
    title: 'Green with Envy',
    description: 'Choose our green with envy wall to incorporate a sense of nature at your next event!',
    size: '2.4m x 2.4m',
    price: 400,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2015/08/IMG_20160731_162934-900x900.jpg',
    title: 'Sunset Ombre',
    description: 'One of our newest additions to our exquisite collection is our Sunset Ombre wall, you and your guests will be swooning over her beauty.',
    size: '2.4m x 2.4m',
    price: 500,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2015/08/12592179_1523690767926589_8580274298281259814_n-804x900.jpg',
    title: 'Pastel Pink',
    description: 'A combination of pastel pink, ivory, champagne and white roses.',
    size: '2.1m x 1.9m',
    price: 450,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2016/08/IMG_20160820_164622-1-900x900.jpg',
    title: 'Classic Pink',
    description: 'If you loved our pastel pink wall, you will definitely love our classic pink wall!',
    size: '2.4m x 2.4m',
    price: 470,
  }),

  new Product({
    imagePath: 'http://www.theflowerwall.com.au/wp-content/uploads/2016/08/20160729_094139-1-1-1-e1478568927618.png',
    title: 'Something Blue',
    description: 'A combination of blue lillies, hydrangeas and assorted roses',
    size: '2.2m x 2.4m',
    price: 460,
  })
];
var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
