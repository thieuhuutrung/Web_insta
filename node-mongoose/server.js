var mongoose = require('mongoose'),
  assert = require('assert'),
  Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/testMongoose';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
  //connected to mongodb
  console.log("Connected to mongodb");

  //------method 1 to add new Dish
  // //Create new dish
  // var newDish = Dishes({
  //   name: 'Dish1',
  //   description : 'ABC'
  // });
  // //add new Dish to database
  // newDish.save(function (err) {
  //   if (err) throw err;
  //   console.log("New Dish created");

  //   //find the dishes and remove all
  //   Dishes.find({},function (err,dishes) {
  //     if (err) throw err;
  //     console.log(dishes);

  //     db.collection('dishes').drop(function (err) {
  //       db.close();
  //     });
  //   });
  // });
  //------method 2 to add new Dish
  Dishes.create({
    name: 'Dish1',
    description: 'ABC',
    comments: {
      rating: 5,
      comment: 'Oh shit',
      author: 'THT'
    }
  }, function (err, dish) {
    if (err) throw err;
    console.log(`New dish ${dish} created`);
    var id = dish._id;

    //after 3000 ms, do some modification
    setTimeout(function () {
      Dishes.findByIdAndUpdate(id, { $set: { description: 'new ABC' } }, { new: true })
        .exec(function (err, dish) {
          if (err) throw err;
          console.log(`Updated a dish ${dish}`);

          //add new comment
          dish.comments.push({
            rating: 3,
            comment: 'good',
            author: 'ABC'
          });
          dish.save(function (err, dish) {
            console.log(`Updated comment ${dish}`);
            db.collection('dishes').drop(function (err) {
              db.close();
            });
          });
        });
    }, 3000);
  });
});