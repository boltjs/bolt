require('../include/include.js');

var Analyser = bolt.kernel.module.Analyser;
var Arr = bolt.kernel.fp.Arr;

var roots0 = ['A', 'B', 'C'];
var allModulesLoaded = {
  A: ['D'],
  G: ['H'],
  H: [],
  C: ['G'],
  B: ['D'],
  D: []
};

var r0 = Analyser.analyse(roots0, allModulesLoaded);

assert(r0.load && r0.load.length === 0, "Analyser detects all modules loaded");

var roots1 = ['A', 'B', 'C'];
var unloadedModule = {
  A: ['D'],
  G: ['H'],
  H: [],
  C: ['G'],
  B: ['D']
};

var r1 = Analyser.analyse(roots1, unloadedModule);

assert(r1.load && Arr.equals(r1.load, ['D']), "Analyser detects unloaded modules");

var roots2 = ['Z'];
var cycle = {
  Z: ['A'],
  A: ['B'],
  B: ['C'],
  C: ['D'],
  D: ['A']
};

var r2 = Analyser.analyse(roots2, cycle);

assert(r2.cycle && Arr.equals(r2.cycle, ['A', 'B', 'C', 'D', 'A']), "Analyser detects cycles");

var roots3 = ['A'];
var complex = {
  A: ['B', 'C' ],
  B: ['C', 'D', 'E' ],
  C: ['E', 'F', 'G'],
  G: []
};

var r3 = Analyser.analyse(roots3, complex);

assert(r3.load && Arr.equals(r3.load, ['E', 'F', 'D']), "Analyser detects unloaded modules in complex case");

var roots4 = ['A', 'B', 'C'];
var missingRoots = {
  A: ['C', 'D' ],
  D: [],
  G: []
};

var r4 = Analyser.analyse(roots4, missingRoots);

assert(r4.load && Arr.equals(r4.load, ['C', 'B']), "Analyser detects missing roots");
