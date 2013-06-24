require('../include/include.js');

var fn = ephox.bolt.kernel.fp.functions;
var ar = ephox.bolt.kernel.fp.array;


var something = function (a, b, c, d, e) {
  return [a, b, c, d, e];
};

var abc = fn.curry(something, 1, 2, 3);
var abcde = fn.curry(abc, 4, 5);

assert(ar.equals(abc(4, 5), [1, 2, 3, 4, 5]), 'one level of curry works with multiple arguments');
assert(ar.equals(abcde(), [1, 2, 3, 4, 5]), 'multiple levels of curry works');


var isthree = function (x) {
  return x === 3;
};

assert(fn.not(isthree)(2), 'not works');
assert(fn.not(isthree)(3) === false, 'not negated works');


var somef = function () {
  return 3;
};

assert(fn.apply(somef) === 3, 'apply works');
