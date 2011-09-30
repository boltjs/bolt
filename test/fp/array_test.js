require('../include/include.js');

var doubleit = function (i) {
  return i * 2;
};

var ar = ephox.bolt.kernel.fp.array;

assert(ar.equals([1, 2, 3], [1, 2, 3]), "arrays are equal.");
assert(!ar.equals([1, 2, 3], [1, 2, 3, 4]), "mismatch in length of second arg is not equal");
assert(!ar.equals([1, 2, 3, 4], [1, 2, 3]), "mismatch in length of first arg is not equal");
assert(!ar.equals([1, 2, 3], [3, 2, 1]), "arrays equals is not bag equals");


assert(ar.equals(ar.map([1, 2, 3], doubleit), [2, 4, 6]), "map should map");
