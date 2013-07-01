require('../include/include.js');

var Obj = demand('bolt.base.fp.Obj');
var Arr = demand('bolt.base.fp.Arr');

var keys = [];
var values = [];
Obj.each({a: 1, b: 2, c: 3}, function (k, v) {
  keys.push(k);
  values.push(v);
});

assert(Arr.equals(keys, ['a', 'b', 'c']), "object each passes key as first argument");
assert(Arr.equals(values, [1, 2, 3]), "object each passes value as second argument");


var maps = Obj.map({a: 1, b: 2, c: 3}, function (k, v) {
  return v * 2;
});

assert(maps.a === 2 && maps.b === 4 && maps.c === 6, "object map should map values");

var dst = {a: 1, b: 2};
var src = {a: 4, c: 3};

Obj.merge(dst, src);

assert(src.a === 4 && src.b === undefined && src.c === 3 && dst.a === 4 && dst.b === 2 && dst.c === 3, "object merge works");

assert(Arr.equals(Obj.keys({a: 1, b: 2}), ['a', 'b']), "keys extracts all the keys in order");
