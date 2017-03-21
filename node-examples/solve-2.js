var rect = require('./rectangle2');
var argv = require('yargs')
    .usage('Usage: node $0 --l=[num] --b=[num]')
    .demand(['l','b'])
    .argv;

function solveRect(l, b) {
  rect(l, b, function (err, rectangle) {
    if (err) {
      console.log(err);
    } else {
      console.log("Area = " + rectangle.area(l, b));
      console.log("Perimeter = " + rectangle.perimeter(l, b));
    }
  });
};

solveRect(argv.l, argv.b);