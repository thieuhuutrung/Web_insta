var mongoose = require('mongoose'),
  assert = require('assert'),
  Dishes = require('./models/dishes'),
  Promotions = require('./models/promotions'),
  Leaders = require('./models/leaders');

var url = 'mongodb://localhost:27017/testMongoose';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
  //connected to mongodb
  console.log("Connected to mongodb");

  //test Dishes
  Dishes.create({
    name: 'Dish1',
    description: 'ABC',
    image: 'images/Dish1.png',
    category: 'Main',
    price: '5.99',
    label: 'new label',
    comments: {
      rating: 5,
      comment: 'Oh shit',
      author: 'THT'
    }
  }, function (err, dish) {
    console.log(err);
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
              //test Promotion
              Promotions.create({
                name: 'Promotion1',
                description: 'ABC',
                image: 'images/promo1.png',
                price: '5.99',
                label: 'new label'
              }, function (err, promotion) {
                if (err) throw err;
                console.log(`New promotion ${promotion} created`);
                var id = promotion._id;

                //after 3000 ms, do some modification
                setTimeout(function () {
                  Promotions.findByIdAndUpdate(id, { $set: { description: 'new ABC' } }, { new: true })
                    .exec(function (err, promotion) {
                      if (err) throw err;
                      console.log(`Updated a promotion ${promotion}`);

                      db.collection('promotions').drop(function (err) {
                        //test Leader
                        Leaders.create({
                          name: 'THT',
                          description: 'CEO',
                          image: 'images/tht.png',
                          designation: 'new designation',
                          abbr: 'CEOOOOOOOOOO'
                        }, function (err, leader) {
                          if (err) throw err;
                          console.log(`New leader ${leader} created`);
                          var id = leader._id;

                          //after 3000 ms, do some modification
                          setTimeout(function () {
                            Leaders.findByIdAndUpdate(id, { $set: { description: 'new CEO' } }, { new: true })
                              .exec(function (err, leader) {
                                if (err) throw err;
                                console.log(`Updated a leader ${leader}`);

                                db.collection('leaders').drop(function (err) {
                                  db.close();
                                });
                              });
                          }, 3000);
                        });
                      });
                    });
                }, 3000);
              });
            });
          });
        });
    }, 3000);
  });




});