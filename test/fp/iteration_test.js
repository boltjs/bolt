require('../include/include.js');


var doubleit = function (i) {
  return i * 2;
};

var iteration = ephox.bolt.kernel.fp.iteration;

assert(iteration.arrayeq([1, 2, 3], [1, 2, 3]), "arrays are equal.");
assert(!iteration.arrayeq([1, 2, 3], [1, 2, 3, 4]), "mismatch in length of second arg is not equal");
assert(!iteration.arrayeq([1, 2, 3, 4], [1, 2, 3]), "mismatch in length of first arg is not equal");
assert(!iteration.arrayeq([1, 2, 3], [3, 2, 1]), "arrays equals is not bag equals");

//assert(iteration.map([1, 2, 3], doubleit));




