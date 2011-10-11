require('../include/include');

var js = ephox.bolt.module.modulator.js;

var pather = function (x) {
  return x;
};

var modulator = js.create(pather, 'lib', 'some/path');

assert(modulator.can('js!lib:file.js'), 'wraped js delegates positive case');
assert(!modulator.can('x!lib:file.js'), 'wraped js delegates negative type');
assert(!modulator.can('js!x:file.js'), 'wraped js delegates negative classifier');
