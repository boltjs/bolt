require('../include/include.js');

var doubleit = function (i) {
  return i * 2;
};

var isone = function (i) {
  return i === 1;
};

var lt5 = function (i) {
  return i < 5;
};

var doubleitarray = function (i) {
  return [doubleit(i)];
};

var ar = ephox.bolt.kernel.fp.array;

assert(ar.equals([1, 2, 3], [1, 2, 3]), "arrays are equal.");
assert(!ar.equals([1, 2, 3], [1, 2, 3, 4]), "mismatch in length of second arg is not equal");
assert(!ar.equals([1, 2, 3, 4], [1, 2, 3]), "mismatch in length of first arg is not equal");
assert(!ar.equals([1, 2, 3], [3, 2, 1]), "arrays equals is not bag equals");


assert(ar.equals(ar.map([1, 2, 3], doubleit), [2, 4, 6]), "map should map");

assert(ar.forall([true, true, true]), "forall default works for true case");
assert(!ar.forall([true, false, true]), "forall default works for false case");
assert(ar.forall([1, 1, 1], isone), "forall explicit works for true case");
assert(!ar.forall([1, 2, 1], isone), "forall explicit works for false case");

assert(ar.equals(ar.filter([1, 5, 0, 4, 2, 7, 192, -1], lt5), [1, 0, 4, 2, -1]), "filter filters");

var abc = ['a', 'b', 'c'];

assert(ar.contains(abc, 'a'), "contains works for first element");
assert(ar.contains(abc, 'c'), "contains works for last element");
assert(!ar.contains(abc, 'd'), "contains works for missing element");

assert(ar.indexof(abc, 'a') === 0, "indexof works for first element");
assert(ar.indexof(abc, 'c') === 2, "indexof works for last element");
assert(ar.indexof(abc, 'd') === -1, "indexof works for missing element");

assert(ar.equals(ar.flatten([[1], [2], [3]]), [1, 2, 3]), "flatten flattens");
assert(ar.equals(ar.flatmap([1, 2, 3], doubleitarray), [2, 4, 6]), "flatmap, it flattens while it maps!!!");
