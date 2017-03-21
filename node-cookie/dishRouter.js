var express = require('express');
var bodyParser = require('body-parser');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')
  .all(function (req, res, next) {
    //res.writeHead(200, { 'Content': 'text/plain' });
    res.set('Content-Type', 'text/plain');
    next();
  })
  .get(function (req, res, next) {
    res.end(`Will send all dishes to you`);
  })
  .post(function (req, res, next) {
    res.end(`Will add the dish ${req.body.name} with details: ${req.body.description} `);
  })
  .delete(function (req, res, next) {
    res.end(`Will delete all the dish(s/es)`);
  });
dishRouter.route('/:nameId')
  .all(function (req, res, next) {
    res.set('Content-Type', 'text/plain');
    next();
  })
  .get(function (req, res, next) {
    res.end(`Will send details of the dish: ${req.params.nameId} to you!`);
  })
  .put(function (req, res, next) {
    res.write(`Updating the dish ${req.params.nameId} \n`);
    res.end(`Will update the dish ${req.params.nameId} with the info: ${req.body.name} with details: ${req.body.description}`);
  })
  .delete(function (req, res, next) {
    res.end(`Will delete the dish ${req.params.nameId}`);
  });

module.exports = dishRouter;