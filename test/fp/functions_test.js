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
