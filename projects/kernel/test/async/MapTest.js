require('../include/include.js');

var Map = bolt.kernel.async.Map;
var Arr = bolt.base.fp.Arr;

var doubleit = function (i) {
  return i * 2;
};

var r;

Map.amap([1, 2, 3], function (datum, success) {
  success(doubleit(datum));
}, function (results) {
  r = results;
});

assert(r, 'onsuccess was called by amap');
assert(r.length === 3 && Arr.equals(r, [2, 4, 6]), 'amap works');
