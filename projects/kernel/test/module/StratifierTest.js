require('../include/include.js');

var Stratifier = bolt.kernel.module.Stratifier;
var Arr = bolt.base.fp.Arr;

var toId = function (o) {
  return o.id;
};

var check = function (input, expected, message) {
  var r = Stratifier.stratify(input);
  var rs = Arr.map(r, toId);
  assert(Arr.equals(rs, expected), message);
};

check([{id: 1, serial: false}, {id: 2, serial: true}], [1], "a single parallel");
check([{id: 0, serial: false}, {id: 1, serial: true}, {id: 2, serial: false}], [0, 2], "multiple parallels");
check([{id: 0, serial: true}, {id: 1, serial: true}, {id: 2, serial: true}], [0], "no parallels");
check([{id: 0, serial: false}, {id: 1, serial: false}, {id: 2, serial: false}], [0, 1, 2], "all parallels");
