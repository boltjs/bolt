require('../include/include');

var amd = ephox.bolt.module.modulator.amd;

var pather = function (x) {
  return x;
};

var modulator = amd.create(pather, 'some.thing', 'some/path');

assert(modulator.can('some.thing'), "wraped amd delegates positive exact case");
assert(modulator.can('some.thing.else'), "wraped amd delegates positive partial case");
assert(!modulator.can('other'), "wraped amd delegates negative case");