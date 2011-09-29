require('../include/include.js');

var amd = ephox.bolt.kernel.modulator.amd;

var idTransformer = function (id) {
  return id.replace(/\./g, '/') + '.rocks';
};

var loaded = [];

var loader = {
  load: function () {
    loaded.push(arguments);
  }
};

var modulator = amd.create('x.y.z', '../a/b', idTransformer, loader);

assert(modulator.can('x.y.z.blah.test'), 'can works for valid id');
assert(!modulator.can('z.y.x.blah.test'), 'can does not work for invalid id');

var triple = modulator.modulate('x.y.z.fm.radio');

assert(triple.url === '../a/b/x/y/z/fm/radio.rocks', 'modulator url transformation');
assert(!triple.serial, 'modulator is not serial');

triple.load('success', 'failure');

assert(loaded.length === 1 && loaded[0][0] === '../a/b/x/y/z/fm/radio.rocks', 'modulator load receives url');
assert(loaded.length === 1 && loaded[0][1] === 'success', 'modulator passes through success callback');
assert(loaded.length === 1 && loaded[0][2] === 'failure', 'modulator passes through failure callback');