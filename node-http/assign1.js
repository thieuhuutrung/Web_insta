var express = require('express');
var morgan = require('morgan');
var assign1Modul = require('./assign1Modul');
var hostname = 'localhost';
var port = 8080;

var app = express();
var dishRouter;
var promotionRouter;
var leadershipRouter;
app.use(morgan('dev'));

//using with v2
assign1Modul.getRouter('dish', function (err, router) {
  if (err) {
    console.log(err);
  } else {
    dishRouter = router;
  }
});

assign1Modul.getRouter('promotion', function (err, router) {
  if (err) {
    console.log(err);
  } else {
    promotionRouter = router;
  }
});

assign1Modul.getRouter('leadership', function (err, router) {
  if (err) {
    console.log(err);
  } else {
    leadershipRouter = router;
  }
});

//using with v1
// assign1Modul('dish', function (err, router) {
//   if (err) {
//     console.log(err);
//   } else {
//     dishRouter = router.getRouter('dish');
//   }
// });

// assign1Modul('promotion', function (err, router) {
//   if (err) {
//     console.log(err);
//   } else {
//     promotionRouter = router.getRouter('promotion');
//   }
// });

// assign1Modul('leadership', function (err, router) {
//   if (err) {
//     console.log(err);
//   } else {
//     leadershipRouter = router.getRouter('leadership');
//   }
// });

app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaderships', leadershipRouter);

app.use(express.static(__dirname + '/public')); // add middleware to serve static file; __dirname => give the absolute path of this directory 

app.listen(port, hostname, function () {
  console.log(`Sever running at http://${hostname}:${port}`);
});