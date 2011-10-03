require('../include/include.js');

var fetcher = ephox.bolt.kernel.module.fetcher;

var onerror = function (message) {
  assert(false, 'kernel call failed: ' + message);
};

var blueprints = {};

var define = function (id, dependencies, definition) {
  blueprints[id] = {};
};

var validator = function (id) {
  return blueprints[id] !== undefined;
};

var modulate = function () {
  var load = function (url, onsuccess, onfailure) {
    define('test', [], function() {
        return { greeting: 'hello world!' };
      }
    );
    onsuccess();
  };
  return { serial: false, load: load, url: 'arbitrary.js' };
};

var modulator = {
  can: function (id) { return id === 'test'; },
  modulate: function (id) { return modulate(); }
};

var fetch = fetcher.create(modulator, validator, onerror);

var isrun = false;

var onsuccess = function () {
  assert(isrun === false, 'success is only called once');
  isrun = true;
};

fetch.fetch(['test'], onsuccess);

assert(isrun, "onsuccess was called");
assert(blueprints['test'] !== undefined, "define was called with the correct module")