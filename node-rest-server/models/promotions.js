var mongoose = require('mongoose');

//create schema
var schema = mongoose.Schema;

//add mongoose currency to mongoosemongoose schema type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//create dish schema
var promotionSchema = new schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  label:{
    type: String,
    default: ''
  },
  price: {
    type: Currency,
    required: true
  }
}, {
    timestamps: true
  });

//Then create a model base on this schema
var Promotions = mongoose.model('promotion', promotionSchema);
//after we do this, mongooes will create a collection in mongodb
// with name = plural form of "dish", and Dishes is  just like a collection
// => it has full function as a collection obj in mongodb module  

module.exports = Promotions;