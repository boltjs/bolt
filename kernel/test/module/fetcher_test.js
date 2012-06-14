require('../include/include.js');

var fetcher = ephox.bolt.kernel.module.fetcher;

var onerror = function (message) {
  assert(false, 'kernel call failed: ' + message);
};

var blueprints = {};

var define = function (id, dependencies, definition) {
  blueprints[id] = {};
};

var fail = function () {
  throw 'unexepected call.';
};

var validator = function (id) {
  return blueprints[id] !== undefined;
};

var regulate = function (ids, define, require, demand, onsuccess, onerror) {
  var load = function (onsuccess, onfailure) {
    define('test', [], function () {
        return { greeting: 'hello world!' };
      }
    );
    onsuccess();
  };

  if (ids.length === 1 && ids[0] === 'test')
    onsuccess([ { id: 'test', serial: false, load: load, url: 'arbitrary.js' } ]);
  else
    onerror('unexpected ids [' + ids.join(', ') + ']');
};

var regulator = {
  regulate: regulate
};

var fetch = fetcher.create(regulator, validator, onerror, define, fail, fail);

var isrun = false;

var onsuccess = function () {
  assert(isrun === false, 'success is only called once');
  isrun = true;
};

fetch.fetch(['test'], onsuccess);

assert(isrun, "onsuccess was called");
assert(blueprints['test'] !== undefined, "define was called with the correct module");