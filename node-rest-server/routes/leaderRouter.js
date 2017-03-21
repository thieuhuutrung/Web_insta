var express = require('express');
var bodyParser = require('body-parser');

var Leaders = require('../models/leaders');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
  .all(function (req, res, next) {
    //res.set('Content-Type', 'text/plain');
    next();
  })
  .get(function (req, res, next) {
    Leaders.find({}, function (err, leaders) {
      if (err) throw err;
      res.json(leaders);
    });
  })
  .post(function (req, res, next) {
    Leaders.create(req.body, function (err, leader) {
      if (err) throw err;

      var id = leader._id;
      res.set('Content-Type', 'text/plain');
      res.end(`Id of new leader is: ${id}`);
    });
  })
  .delete(function (req, res, next) {
    Leaders.remove({}, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
leaderRouter.route('/:leaderId')
  .all(function (req, res, next) {
    //res.set('Content-Type', 'text/plain');
    next();
  })
  .get(function (req, res, next) {
    Leaders.findById(req.params.leaderId)
      .exec(function (err, leader) {
        res.json(leader);
      });
  })
  .put(function (req, res, next) {
    Leaders.findByIdAndUpdate(req.params.leaderId, { $set: req.body }, { new: true }, function (err, leader) {
      if (err) throw err;
      res.json(leader);
    });
  })
  .delete(function (req, res, next) {
    Leaders.findByIdAndRemove(req.params.leaderId, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

module.exports = leaderRouter;