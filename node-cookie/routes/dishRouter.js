var express = require('express');
var bodyParser = require('body-parser');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')
  .all(function (req, res, next) {
    //res.set('Content-Type', 'text/plain');
    next();
  })
  .get(function (req, res, next) {
    Dishes.find({}, function (err, dishes) {
      if (err) throw err;
      res.json(dishes);
    });
  })
  .post(function (req, res, next) {
    Dishes.create(req.body, function (err, dish) {
      if (err) throw err;

      var id = dish._id;
      res.set('Content-Type', 'text/plain');
      res.end(`Id of new dish is: ${id}`);
    });
  })
  .delete(function (req, res, next) {
    Dishes.remove({}, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
dishRouter.route('/:dishId')
  .all(function (req, res, next) {
    //res.set('Content-Type', 'text/plain');
    next();
  })
  .get(function (req, res, next) {
    Dishes.findById(req.params.dishId)
      .exec(function (err, dish) {
        res.json(dish);
      });
  })
  .put(function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, { $set: req.body }, { new: true }, function (err, dish) {
      if (err) throw err;
      res.json(dish);
    });
  })
  .delete(function (req, res, next) {
    Dishes.findByIdAndRemove(req.params.dishId, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

//handle the comments
dishRouter.route('/:dishId/comments')
  .all(function (res, req, next) {
    next();
  })
  .get(function (res, req, next) {
    Dishes.findById(res.params.dishId)
      .exec(function (err, dish) {
        if (err) throw err;
        req.json(dish.comments);
      });
  })
  .post(function (res, req, next) {
    Dishes.findById(res.params.dishId)
      .exec(function (err, dish) {
        if (err) throw err;
        dish.comments.push(res.body);

        dish.save(function (err, dish) {
          req.json(dish);
        });
      })
  })
  .delete(function (res, req, next) {
    Dishes.findByIdAndUpdate(res.params.dishId, { $set: { comments: [] } }, { new: true }, function (err, dish) {
      if (err) throw err;
      req.json(dish);
    });
  });

dishRouter.route('/:dishId/comments/:commentId')
  .all(function (res, req, next) {
    next();
  })
  .get(function (res, req, next) {
    Dishes.findById(res.params.dishId, function (err, dish) {
      if (err) throw err;
      req.json(dish.comments.id(res.params.commentId));
    });
  })
  .put(function (res, req, next) {
    Dishes.findById(res.params.dishId,function (err,dish){
      if (err) throw err;
      //delete the comment
      dish.comments.id(res.params.commentId).remove();

      //add new comment
      dish.comments.push(res.body);
      dish.save(function (err,dish) {
        if (err) throw err;
        req.json(dish);
      }); 
    });
    //we cant do as below because doing ike this will bypass the mongoose with all the restriction in the schema 
    // Dishes.findOneAndUpdate({ _id: res.params.dishId, 'comments._id':res.params.commentId }, { $set: {'comments.$':res.body} }, { new: true },function (err,dish) {
    //   if (err) throw err;
    //   console.log(`Updated comment: ${res.body}`);
    //   req.json(dish);
    // });
  })
  .delete(function (res, req, next) {
    Dishes.findById(res.params.dishId,function (err,dish){
      if (err) throw err;
      //delete the comment
      dish.comments.id(res.params.commentId).remove();

      dish.save(function (err,result) {
        if (err) throw err;
        req.json(result);
      });
    });
  });
module.exports = dishRouter;