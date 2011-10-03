require('../include/include.js');

var fetcher = ephox.bolt.kernel.module.fetcher;

var onerror = function (message) {
  fail(result, 'kernel call failed: ' + message);
};

var modulate = function () {
  var load = function () {
    define('ephox.bolt.demo.hello', [], function() {
        return { greeting: 'hello world!' };
      }
    );
  };
  return {serial: false, load: load, url: url};
};

var modulator = {
  can: function (id) { return id === 'ephox.bolt.demo.hello'; },
  modulate: function (id) {       console.log('here2');return modulate(); }
};