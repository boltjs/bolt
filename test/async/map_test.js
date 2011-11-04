require('../include/include.js');

var map = ephox.bolt.kernel.async.map;
var ar = ephox.bolt.kernel.fp.array;

var doubleit = function (i) {
  return i * 2;
};

var r;

map.amap([1, 2, 3], function (datum, success) {
  success(doubleit(datum));
}, function (results) {
  r = results;
});

assert(r, 'onsuccess was called by amap');
assert(r.length === 3 && ar.equals(r, [2, 4, 6]), 'amap works');
