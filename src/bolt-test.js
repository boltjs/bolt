var configfile = process.argv[2];
var tests = process.argv.slice(3); // argv[0] = node, argv[1] = jsc.js, argv[2] = config

require('./kernel');
require('./loader');
require('./module');
require('./test');
require('./jssert');

var path = require('path');
var runner = ephox.bolt.test.run.runner;
var reporter = ephox.bolt.test.report.vanilla;
var fn = ephox.bolt.kernel.fp.functions;
var node = ephox.bolt.module.reader.node;
var reader = fn.curry(node.read, path.resolve(configfile));

runner.run(reporter, reader, tests);
