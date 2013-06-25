require('../include/include.js');

var Globals = bolt.kernel.util.Globals;

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

assert(Globals.resolve('a.c.d.e', blob) === 'hello', 'resolve deep');
assert(Globals.resolve('a.c', blob).d.e === 'hello', 'resolve partial');
assert(Globals.resolve('b', blob).g === 7, 'resolve top level');


Globals.remove('a.c.d.e', blob)

assert(Globals.resolve('a.c.d.e', blob) === undefined, 'remove deep');
assert(Globals.resolve('a.c.d.f', blob) === 'other', 'remove only specified path');


Globals.remove('b', blob)

assert(Globals.resolve('b', blob) === undefined, 'remove top level');
