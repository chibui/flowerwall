var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    // category:     {type: String},
  category:     {type: Schema.Types.ObjectId, ref: 'category'},
  size:         {type: String},
  price:        {type: Number, required: true}

});

module.exports = mongoose.model('product', schema);
