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

var regulate = function () {
  var load = function (onsuccess, onfailure) {
    define('test', [], function () {
        return { greeting: 'hello world!' };
      }
    );
    onsuccess();
  };
  return { serial: false, load: load, url: 'arbitrary.js' };
};

var regulator = {
  can: function (id) { return id === 'test'; },
  regulate: regulate
};

var fetch = fetcher.create(regulator, validator, onerror);

var isrun = false;

var onsuccess = function () {
  assert(isrun === false, 'success is only called once');
  isrun = true;
};

fetch.fetch(['test'], onsuccess);

assert(isrun, "onsuccess was called");
assert(blueprints['test'] !== undefined, "define was called with the correct module")