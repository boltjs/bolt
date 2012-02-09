var configfile = process.argv[2];
var tests = process.argv.slice(3); // argv[0] = node, argv[1] = jsc.js, argv[2] = config

require('./kernel');
require('./loader');
require('./module');
require('./jssert');

var builtins = ephox.bolt.module.config.builtins.commonjs;
var install = ephox.bolt.module.bootstrap.install;
var node = ephox.bolt.module.reader.node;
var path = ephox.bolt.module.util.path;
var transport = ephox.bolt.loader.transporter.commonjs.read;

var reader = function (done) {
  node.read(process.cwd() + '/.', configfile, done);
};

global.test = function (deps, fn) {
  if (typeof deps === 'function' && fn === undefined) {
    fn = deps;
    deps = [];
  }

  install.install(reader, builtins, transport);

  global.define = ephox.bolt.module.api.define;
  global.require = ephox.bolt.module.api.require;
  global.demand = ephox.bolt.module.api.demand;
  ephox.bolt.module.api.require(deps, fn);
};

tests.map(function (test) {
  return process.cwd() + '/' + test;
}).forEach(require);
