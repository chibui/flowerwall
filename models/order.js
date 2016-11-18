var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user:       { type: Schema.Types.ObjectId, ref: 'User' }, // creates relationship to user.
  cart:       { type: Object, required: true },
  address:    { type: String, required: true },
  name:       { type: String, required: true },
  paymentId:  { type: String, required: true },
  date:       { type: Date, default: Date.now},
  confirm:    { type: Boolean},
  completed:  { type: Boolean}
});

module.exports = mongoose.model('Order', schema);
