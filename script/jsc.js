var mode = process.argv[2];
var args = process.argv.slice(3); // argv[0] = node, argv[1] = jsc.js, argv[2] = MODE

require('./kernel');
require('./loader');
require('./module');
require('./compiler');

ephox.bolt.compiler.mode[mode].run.apply(null, args);
