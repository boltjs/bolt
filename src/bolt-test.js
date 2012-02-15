// argv[0] = node, argv[1] = jsc.js, argv[2] = verbose, argv[3] = config, argv[4..n] = tests
var verbose = process.argv[2];
var configfile = process.argv[3];
var tests = process.argv.slice(4);

require('./kernel');
require('./loader');
require('./module');
require('./test');
require('./jssert');

var path = require('path');
var runner = ephox.bolt.test.run.runner;
var reporter = ephox.bolt.test.report.logger.create(verbose === 'true');
var fn = ephox.bolt.kernel.fp.functions;
var node = ephox.bolt.module.reader.node;
var reader = fn.curry(node.read, process.cwd() + '/.', configfile);

runner.run(reporter, reader, tests);
