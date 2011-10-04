require('../include/include.js');

var compound = ephox.bolt.kernel.modulator.compound;

var modulator = function (test) {
  return { can: function(id) { return id === test; }, modulate: function() { return test; } }
};

var c = compound.create([
  modulator('test1'),
  modulator('test2'),
  modulator('test3')
]);

assert(c.can('test2'), 'compound modulator can can something it knows about');
assert(!c.can('blah'), 'compound modulator can not can something it does not know about');
assert(c.modulate('test3') === 'test3', 'compound modulator can modulate something it knows about');
assert(c.modulate('test1') === 'test1', 'compound modulator can modulate something else it knows about');
