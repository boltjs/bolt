require('../include/include.js');

var piggybacker = ephox.bolt.kernel.async.piggybacker;
var ar = ephox.bolt.kernel.fp.array;

var success = {};
var successf = function (key) {
  return function (s) {
    success[key] = s;
  }
};
var trigger = function (key) {
  assert(success[key] !== undefined, 'f was invoked when expected for key: "' + key + '"');
  success[key]();
  delete success[key];
};
var failf = function () {
  assert(false, 'f was called in parallel when it should not be');
};

var results = {};
var action = function (key, marker) {
  return function () {
    if (results[key] === undefined)
      results[key] = [];
    return results[key].push(marker);
  };
};
var check = function (key, expected, message) {
  var actual = results[key];
  var result = ar.equals(actual, expected);
  assert(result, message);
};


var pb = piggybacker.create();
pb.piggyback('test', successf('test'), action('test', 'a'));
pb.piggyback('other', successf('other'), action('other', 'x'));
pb.piggyback('test', failf, action('test', 'b'));
pb.piggyback('other', failf, action('other', 'y'));
pb.piggyback('test', failf, action('test', 'c'));
trigger('test');
trigger('other');
check('test', ['a', 'b', 'c'], 'all actions were invoked');
check('other', ['x', 'y'], 'all actions were invoked for other requests in parallel');

pb.piggyback('test', successf('test'), action('test', 'd'));
pb.piggyback('test', failf, action('test', 'e'));
trigger('test');
check('test', ['a', 'b', 'c', 'd', 'e'], 'all actions were invoked for subsequent call');
