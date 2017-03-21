var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var routes = require('./routes/index');
var users = require('./routes/users');
var generalRouter = require('./routes/generalRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var dishRouter;
var promotionRouter;
var leadershipRouter;

//using with v2
generalRouter.getRouter('dish', function (err, router) {
  if (err) {
    console.log(err);
  } else {
    dishRouter = router;
  }
});

generalRouter.getRouter('promotion', function (err, router) {
  if (err) {
    console.log(err);
  } else {
    promotionRouter = router;
  }
});

generalRouter.getRouter('leadership', function (err, router) {
  if (err) {
    console.log(err);
  } else {
    leadershipRouter = router;
  }
});

app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaderships', leadershipRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
