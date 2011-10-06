/*
 * == error codes ==
 * jsc.js           - 0x
 * compiler.js      - 1x
 * configurator.js  - 2x
 * loader.js        - 3x
 * evaler.js        - 4x
 * outputer.js      - 5x
 * state.js         - 9x
 */

var mode = process.argv[2];
var args = process.argv.slice(3); // argv[0] = node, argv[1] = jsc.js, argv[2] = MODE

require('./compiler');

ephox.bolt.compiler.mode[mode].run.apply(null, args);
