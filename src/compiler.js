require('../lib/kernel.js');

var fs = require('fs');
var configurator = require('./configurator.js');
var outputer = require('./outputer.js');
var loader = require('./loader.js');
var store = require('./state.js');
var error = require('./error');

var fn = ephox.bolt.kernel.fp.functions;

global['define'] = store.define;

/*
 * This is the core compiler process, it recursively
 * identifies and loads module definitions to determine
 * dependencies. Once we know about all modules, we
 * then traverse and print them out, in-order, depth-first.
 *
 *  1. analyse current state, to detemine and modules that need to load
 *     - if there was a cycle, fail
 *  2. if there are no modules to load, we are done
 *     - depth-first traversal of dependencies
 *     - output module file (wrapped if necessary)
 *  3. for each id to load
 *     - validate that we know how to load
 *     - validate that we have not defined the module already
 *     - convert ids to specifications
 *     - store spec
 *     - if required, evaluate module for to determine dependencies
 *  4. recurse until no more modules to load
 */
var compile = function (modulator, root, modules) {
    var load = fn.curry(loader.load, store, modulator, root);
    var ids = loader.analyse(store, modules);
    while (ids.length > 0) {
        ids.forEach(load);
        ids = loader.analyse(store, modules);
    };
    outputer.output(store, modules);
};


exports.compile = function (root, config, module, libraries) {
    libraries.forEach(require);
    var modulator = configurator.load(config);
    compile(modulator, root, [module]);
};
