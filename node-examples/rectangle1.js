// exports.perimeter = function (x, y) {
//   return 2 * (x + y);
// }
// exports.area =  function (x, y) {
//   return x * y;
// }

module.exports = function () {
  return {
    area: function (x, y) {
      return x * y;
    },

    perimeter: function (x, y) {
      return 2 * (x + y);
    }
  };
};