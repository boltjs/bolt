require('../include/include');

var m = ephox.bolt.kernel.modulator.globalator;

var modulator = m.create();

// Global test data
global.dummy = {};
global.dummy.someAwesomeGlobal = 'fred';
global.dummy.someNotAwesomeGlobal = 'barney';

// Mock out necessary calls
var defineParams;
var define = function(id, deps, definition) {
  defineParams.called = true;
  defineParams.id = id;
  defineParams.deps = deps;
  defineParams.definition = definition;
  defineParams.value = definition();
};

var successCalled;
var onsuccess = function () {
  successCalled = true;
};

var failureMessage;
var onfailure = function (message) {
  failureMessage = message;
};

var reset = function () {
  defineParams = {};
  successCalled = false;
  failureMessage = undefined;
};

var modulate = function(id) {
  reset();
  modulator.modulate(id, define).load(onsuccess, onfailure);
};

var checkModulateSuccess = function (id, value, message) {
  modulate(id);
  assert(successCalled && failureMessage === undefined &&
         defineParams.id === id && defineParams.deps && defineParams.deps.length === 0 && defineParams.value === value, message);
};

var checkModulateFailure = function (id, message) {
  modulate(id);
  assert(!successCalled && failureMessage && defineParams.called === undefined, message);
};

assert(modulator.can('global!dummy'), 'global can');
assert(modulator.can('global!dummy.someAwesomeGlobal'), 'global really can');
assert(!modulator.can('dummy.someAwesomeGlobal'), 'global does not lie about canning');
assert(!modulator.can('js!something.different'), 'global really does not lie about canning');

checkModulateSuccess('global!dummy.someAwesomeGlobal', 'fred', 'global can modulate a global');
checkModulateSuccess('global!dummy.someNotAwesomeGlobal', 'barney', 'global can really modulate a global');

checkModulateFailure('global!dummy.NONEXISTANT', 'global does not modulate a non-existant global');
checkModulateFailure('xxx!dummy.someAwesomeGlobal', 'global does not modulate an invalid global');
