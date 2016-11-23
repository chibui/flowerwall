var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user:         { type: Schema.Types.ObjectId, ref: 'User' }, // creates relationship to user.
  cart:         { type: Object, required: true },
  address:      { type: String, required: true },
  name:         { type: String, required: true },
  eventDate:    { type: Date},
  startTime:    { type: Date},
  endTime:      { type: Date},
  paymentId:    { type: String, required: true },
  date:         { type: Date, default: Date.now},
  confirm:      { type: Boolean, default: false},
  venueName:    { type: String},
  venueContact: { type: String},
  venueNumber:  { type: String},
  venueEmail:   { type: String},
  venueAddress: { type: String, required: true },
  eventType:    { type: Array}, //must create a separate model
  stair:        { type: Boolean, default: false },
  lift:         { type: Boolean, default: false },
  message:      { type: String},
  balance:      { type: Number},
  balancePaid:  { type: Boolean, default: false},
  completed:    { type: Boolean, default: false}


});

module.exports = mongoose.model('Order', schema);
