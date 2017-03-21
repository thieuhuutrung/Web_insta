var express = require('express');
var bodyParser = require('body-parser');

//v2
module.exports = {
  getRouter: function (name, callback) {
    try {
      if (name == null) {
        throw new Error("The path can not be null");
      } else {
        var nameRouter = express.Router();
        nameRouter.use(bodyParser.json());
        nameRouter.route('/')
          .all(function (req, res, next) {
            //res.writeHead(200, { 'Content': 'text/plain' });
            res.set('Content-Type', 'text/plain');
            next();
          })
          .get(function (req, res, next) {
            res.end(`Will send all ${name}(s/es) to you`);
          })
          .post(function (req, res, next) {
            res.end(`Will add the ${name} ${req.body.name} with details: ${req.body.description} `);
          })
          .delete(function (req, res, next) {
            res.end(`Will delete all the ${name}(s/es)`);
          });
        nameRouter.route('/:nameId')
          .all(function (req, res, next) {
            //res.writeHead(200, { 'Content': 'text/plain' });
            res.set('Content-Type', 'text/plain');
            next();
          })
          .get(function (req, res, next) {
            res.end(`Will send details of the ${name}: ${req.params.nameId} to you!`);
          })
          .put(function (req, res, next) {
            res.write(`Updating the ${name} ${req.params.nameId} \n`);
            res.end(`Will update the ${name} ${req.params.nameId} with the info: ${req.body.name} with details: ${req.body.description}`);
          })
          .delete(function (req, res, next) {
            res.end(`Will delete the ${name} ${req.params.nameId}`);
          });
        callback(null, nameRouter);
      }
    } catch (error) {
      callback(error, null);
    }
  }
};

//v1
// module.exports = function (namebis) {
//   try {
//     if (namebis == null) {
//       throw new Error("The path can not be null");
//     } else {
//       callback(null, {
//         getRouter: function (name) {
//           console.log(name);
//           var nameRouter = express.Router();
//           nameRouter.use(bodyParser.json());

//           nameRouter.route('/')
//             .all(function (req, res, next) {
//               res.writeHead(200, { 'Content': 'text/plain' });
//               next();
//             })
//             .get(function (req, res, next) {
//               console.log(name);
//               res.end(`Will send all ${name}(s/es) to you`);
//             })
//             .post(function (req, res, next) {
//               res.end(`Will add the ${name} ${req.body.name} with details: ${req.body.description} `);
//             })
//             .delete(function (req, res, next) {
//               res.end(`Will delete all the ${name}(s/es)`);
//             });
//           nameRouter.route('/:nameId')
//             .all(function (req, res, next) {
//               res.writeHead(200, { 'Content': 'text/plain' });
//               next();
//             })
//             .get(function (req, res, next) {
//               res.end(`Will send details of the ${name}:  ${req.params.nameId} to you!`);
//             })
//             .put(function (req, res, next) {
//               res.write(`Updating the ${name} ${req.params.nameId} \n`);
//               res.end(`Will update the ${name} ${req.params.nameId} with the info: ${req.body.name} with details: ${req.body.description}`);
//             })
//             .delete(function (req, res, next) {
//               res.end(`Will delete the ${name} ${req.params.nameId}`);
//             });
//           return nameRouter;
//         }
//       });
//     }
//   } catch (error) {
//     callback(error, null);
//   }
// };