var Client = require('../models/client');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
// mongoose.connect(process.env.FLOWERWALL)


var clients = [
  new Client({
    name: 'Vera Wang',
    logo: '../images/verawang.png'
  }),
  new Client({
    name: 'Seven',
    logo: '../images/7.png'
  }),
  new Client({
    name: 'Beauty Base',
    logo: '../images/beautybase.png'
  }),
  new Client({
    name: 'Getty Images',
    logo: '../images/gettyimages.svg'
  }),
  new Client({
    name: 'Lifestyle Suite',
    logo: '../images/lifestylesuite.png'
  }),
  new Client({
    name: 'Mecca',
    logo: '../images/Mecca.png'
  }),
  new Client({
    name: 'Nova',
    logo: '../images/Nova.png'
  }),
  new Client({
    name: 'Novotel',
    logo: '../images/novotel.jpg'
  }),
  new Client({
    name: 'Practical Parenting',
    logo: '../images/practicalparenting.svg'
  }),
  new Client({
    name: 'Sportscraft',
    logo: '../images/sportscraft.png'
  })
];

var done = 0;

for (var i = 0; i < clients.length; i++) {
  clients[i].save(function(err,result) {
    done++;
    if (done === clients.length) {
      console.log(clients);
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
