require('../include/include.js');

var Func = bolt.kernel.fp.Func;
var Arr = bolt.kernel.fp.Arr;


var something = function (a, b, c, d, e) {
  return [a, b, c, d, e];
};

var abc = Func.curry(something, 1, 2, 3);
var abcde = Func.curry(abc, 4, 5);

assert(Arr.equals(abc(4, 5), [1, 2, 3, 4, 5]), 'one level of curry works with multiple arguments');
assert(Arr.equals(abcde(), [1, 2, 3, 4, 5]), 'multiple levels of curry works');


var isthree = function (x) {
  return x === 3;
};

assert(Func.not(isthree)(2), 'not works');
assert(Func.not(isthree)(3) === false, 'not negated works');


var somef = function () {
  return 3;
};

assert(Func.apply(somef) === 3, 'apply works');
