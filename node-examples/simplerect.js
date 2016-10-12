var rect = {
  perimeter: function (x, y) {
    return 2 * (x + y);
  },
  area: function (x, y) {
    return x * y;
  }
};

function solveRect(l, b) {
  if (l < 0 || b < 0) console.log("l and b have to greater than 0: l = " + l + ",b = " + b);
  else {
    console.log("Area = " + rect.area(l, b));
    console.log("Perimeter = " + rect.perimeter(l, b));
  }
}

solveRect(3, 3);
solveRect(-1, 1);
solveRect(0, 0);