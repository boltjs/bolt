require('../include/include.js');

var doubleit = function (i) {
  return i * 2;
};

var it = ephox.bolt.kernel.fp.iteration;

assert(it.arrayeq([1, 2, 3], [1, 2, 3]), "arrays are equal.");
assert(!it.arrayeq([1, 2, 3], [1, 2, 3, 4]), "mismatch in length of second arg is not equal");
assert(!it.arrayeq([1, 2, 3, 4], [1, 2, 3]), "mismatch in length of first arg is not equal");
assert(!it.arrayeq([1, 2, 3], [3, 2, 1]), "arrays equals is not bag equals");


assert(it.arrayeq(it.map([1, 2, 3], doubleit), [2, 4, 6]), "map should map");


var okeys = [];
var ovalues = [];
it.oeach({a: 1, b: 2, c: 3}, function (k, v) {
  okeys.push(k);
  ovalues.push(v);
});

assert(it.arrayeq(okeys, ['a', 'b', 'c']), "oeach passes key as first argument");
assert(it.arrayeq(ovalues, [1, 2, 3]), "oeach passes value as second argument");
