require('../include/include.js');

var bolt = ephox.bolt.kernel.modulator.bolt;

var idTransformer = function (id) {
  return id.replace(/\./g, '/') + '.rocks';
};

var loaded = [];

var loader = {
  load: function () {
    loaded.push(arguments);
  }
};

var id = function (x) { return x; };

var modulator = bolt.create(loader, id, 'x.y.z', '../a/b', idTransformer);

assert(modulator.can('x.y.z.blah.test'), 'can works for valid id');
assert(!modulator.can('z.y.x.blah.test'), 'can does not work for invalid id');

var triple = modulator.get('x.y.z.fm.radio');

assert(triple.url === '../a/b/x/y/z/fm/radio.rocks.js', 'modulator url transformation');
assert(!triple.serial, 'modulator is not serial');

triple.load('success', 'failure');
 
assert(loaded.length === 1 && loaded[0][0] === '../a/b/x/y/z/fm/radio.rocks.js', 'modulator load receives url');
assert(loaded.length === 1 && loaded[0][1] === 'success', 'modulator passes through success callback');
assert(loaded.length === 1 && loaded[0][2] === 'failure', 'modulator passes through failure callback');
