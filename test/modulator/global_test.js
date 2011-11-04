require('../include/include');

var globalator = ephox.bolt.kernel.modulator.globalator;

var source = globalator.create();

// Global test data
global.dummy = {};
global.dummy.someAwesomeGlobal = 'fred';
global.dummy.someNotAwesomeGlobal = 'barney';

// Mock out necessary calls
var defineParams;
var define = function (id, deps, definition) {
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

var get = function (id) {
  reset();
  source.get(id, define).load(onsuccess, onfailure);
};

var checkGetSuccess = function (id, value, message) {
  get(id);
  assert(successCalled && failureMessage === undefined &&
         defineParams.id === id && defineParams.deps && defineParams.deps.length === 0 && defineParams.value === value, message);
};

var checkGetFailure = function (id, message) {
  get(id);
  assert(!successCalled && failureMessage && defineParams.called === undefined, message);
};

assert(source.can('global!dummy'), 'global can');
assert(source.can('global!dummy.someAwesomeGlobal'), 'global really can');
assert(!source.can('dummy.someAwesomeGlobal'), 'global does not lie about canning');
assert(!source.can('js!something.different'), 'global really does not lie about canning');

checkGetSuccess('global!dummy.someAwesomeGlobal', 'fred', 'global can modulate a global');
checkGetSuccess('global!dummy.someNotAwesomeGlobal', 'barney', 'global can really modulate a global');

checkGetFailure('global!dummy.NONEXISTANT', 'global does not modulate a non-existant global');
checkGetFailure('xxx!dummy.someAwesomeGlobal', 'global does not modulate an invalid global');
