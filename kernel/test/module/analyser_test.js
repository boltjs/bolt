require('../include/include.js');

var analyser = ephox.bolt.kernel.module.analyser;
var ar = ephox.bolt.kernel.fp.array;

var roots0 = ['A', 'B', 'C'];
var allModulesLoaded = {
  A: ['D'],
  G: ['H'],
  H: [],
  C: ['G'],
  B: ['D'],
  D: []
};

var r0 = analyser.analyse(roots0, allModulesLoaded);

assert(r0.load && r0.load.length === 0, "analyser detects all modules loaded");

var roots1 = ['A', 'B', 'C'];
var unloadedModule = {
  A: ['D'],
  G: ['H'],
  H: [],
  C: ['G'],
  B: ['D']
};

var r1 = analyser.analyse(roots1, unloadedModule);

assert(r1.load && ar.equals(r1.load, ['D']), "analyser detects unloaded modules");

var roots2 = ['Z'];
var cycle = {
  Z: ['A'],
  A: ['B'],
  B: ['C'],
  C: ['D'],
  D: ['A']
};

var r2 = analyser.analyse(roots2, cycle);

assert(r2.cycle && ar.equals(r2.cycle, ['A', 'B', 'C', 'D', 'A']), "analyser detects cycles");

var roots3 = ['A'];
var complex = {
  A: ['B', 'C' ],
  B: ['C', 'D', 'E' ],
  C: ['E', 'F', 'G'],
  G: []
};

var r3 = analyser.analyse(roots3, complex);

assert(r3.load && ar.equals(r3.load, ['E', 'F', 'D']), "analyser detects unloaded modules in complex case");

var roots4 = ['A', 'B', 'C'];
var missingRoots = {
  A: ['C', 'D' ],
  D: [],
  G: []
};

var r4 = analyser.analyse(roots4, missingRoots);

assert(r4.load && ar.equals(r4.load, ['C', 'B']), "analyser detects missing roots");
