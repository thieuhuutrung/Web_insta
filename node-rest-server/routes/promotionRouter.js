var express = require('express');
var bodyParser = require('body-parser');

var Promotions = require('../models/promotions');

var promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());
promotionRouter.route('/')
  .all(function (req, res, next) {
    //res.set('Content-Type', 'text/plain');
    next();
  })
  .get(function (req, res, next) {
    Promotions.find({}, function (err, promotions) {
      if (err) throw err;
      res.json(promotions);
    });
  })
  .post(function (req, res, next) {
    Promotions.create(req.body, function (err, promotion) {
      if (err) throw err;

      var id = promotion._id;
      res.set('Content-Type', 'text/plain');
      res.end(`Id of new promotion is: ${id}`);
    });
  })
  .delete(function (req, res, next) {
    Promotions.remove({}, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
promotionRouter.route('/:promotionId')
  .all(function (req, res, next) {
    //res.set('Content-Type', 'text/plain');
    next();
  })
  .get(function (req, res, next) {
    Promotions.findById(req.params.promotionId)
      .exec(function (err, promotion) {
        res.json(promotion);
      });
  })
  .put(function (req, res, next) {
    Promotions.findByIdAndUpdate(req.params.promotionId, { $set: req.body }, { new: true }, function (err, promotion) {
      if (err) throw err;
      res.json(promotion);
    });
  })
  .delete(function (req, res, next) {
    Promotions.findByIdAndRemove(req.params.promotionId, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

module.exports = promotionRouter;