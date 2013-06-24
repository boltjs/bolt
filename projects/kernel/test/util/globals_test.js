require('../include/include.js');

var globals = ephox.bolt.kernel.util.globals;

var blob = {
  a: {
    c: {
      d: {
        e: 'hello',
        f: 'other'
      }
    }
  },
  b: {
    g: 7
  }
};

assert(globals.resolve('a.c.d.e', blob) === 'hello', 'resolve deep');
assert(globals.resolve('a.c', blob).d.e === 'hello', 'resolve partial');
assert(globals.resolve('b', blob).g === 7, 'resolve top level');


globals.remove('a.c.d.e', blob)

assert(globals.resolve('a.c.d.e', blob) === undefined, 'remove deep');
assert(globals.resolve('a.c.d.f', blob) === 'other', 'remove only specified path');


globals.remove('b', blob)

assert(globals.resolve('b', blob) === undefined, 'remove top level');
