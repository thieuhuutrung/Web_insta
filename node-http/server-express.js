var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 8080;

var app = express();

app.use(morgan('dev')); // for logging
app.use(bodyParser.json()); // auto convert json format to js object 

//use espress router

// app.all('/dishes', function (req, res, next) { //apply to all http start with path => use for middleware, authen, ...
//   res.writeHead(200, { 'Content': 'text/plain' });
//   next();
// });

// app.get('/dishes', function (req, res, next) { //handle GET for /dishes
//   res.end('Will send all dishes to you');
// });

// app.get('/dishes/:dishId', function (req, res, next) {
//   res.end(`Will send details of the dish:  ${req.params.dishId} to you!`);
// });

// app.post('/dishes', function (req, res, next) { //handle POST for /dishes
//   res.end(`Will add the dish ${req.body.name} with details: ${req.body.description} `);
// });

// app.put('/dishes/:dishId', function (req, res, next) { //handle PUT for /dishes/dishID
//   res.write(`Updating the dish ${req.params.dishId} \n`);
//   res.end(`Will update the dish ${req.params.dishId} with the info: ${req.body.name} with details: ${req.body.description}`);
// });

// app.delete('/dishes/:dishId', function (req, res, next) { //handle DELETE for /dishes/dishID
//   res.end(`Will delete the dish ${req.params.dishId}`);
// });

// app.delete('/dishes', function (req, res, next) { //handle DELETE for /dishes
//   res.end(`Will delete all the dishes`);
// });


//use better router
var dishesRouter = express.Router();
dishesRouter.use(bodyParser.json());

dishesRouter.route('/')
.all(function(req,res,next){
  res.writeHead(200, { 'Content': 'text/plain' });
  next();
})
.get(function (req, res, next) { //handle GET for /dishes
  res.end('Will send all dishes to you');
})
.post(function (req, res, next) { //handle POST for /dishes
  res.end(`Will add the dish ${req.body.name} with details: ${req.body.description} `);
})
.delete(function (req, res, next) { //handle DELETE for /dishes
  res.end(`Will delete all the dishes`);
});

dishesRouter.route('/:dishId')
.all(function(req,res,next){
  res.writeHead(200, { 'Content': 'text/plain' });
  next();
})
.get(function (req, res, next) {
  res.end(`Will send details of the dish:  ${req.params.dishId} to you!`);
})
.put(function (req, res, next) { //handle PUT for /dishes/dishID
  res.write(`Updating the dish ${req.params.dishId} \n`);
  res.end(`Will update the dish ${req.params.dishId} with the info: ${req.body.name} with details: ${req.body.description}`);
})
.delete(function (req, res, next) { //handle DELETE for /dishes/dishID
  res.end(`Will delete the dish ${req.params.dishId}`);
});

app.use('/dishes',dishesRouter);//this mean apply dishesRouter for the /dishes
app.use(express.static(__dirname + '/public')); // add middleware to serve static file; __dirname => give the absolute path of this directory 

app.listen(port, hostname, function () {
  console.log(`Sever running at http://${hostname}:${port}`);
});



// app.use(function (req, res, next) {
//   console.log(req.headers);

//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.end('<html><body><h1>Hello World</h1></body></html>');
// });

// var server = http.createServer(app);

// server.listen(port, hostname, function () {
//   console.log(`Sever running at http://${hostname}:${port}`);
// });