var mongoose = require('mongoose');

//create schema
var schema = mongoose.Schema;

//create dish schema
var leaderSchema = new schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  abbr:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
    timestamps: true
  });

//Then create a model base on this schema
var Leaders = mongoose.model('leader', leaderSchema);
//after we do this, mongooes will create a collection in mongodb
// with name = plural form of "dish", and Dishes is  just like a collection
// => it has full function as a collection obj in mongodb module  

module.exports = Leaders;