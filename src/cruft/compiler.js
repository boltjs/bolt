/*
 * This is the core compiler process, it  identifies and loads module
 * definitions to determine dependencies. Once we know about all modules,
 * we then traverse and print them out, in-order, depth-first.
 *
 *  1. analyse current state, to detemine and modules that need to load
 *     - if there was a cycle, fail
 *  2. while there are ids to load; for each id to load
 *     - validate that we know how to load
 *     - validate that we have not defined the module already
 *     - convert ids to specifications
 *     - store spec
 *     - if required, evaluate module for to determine dependencies
 *  3.  depth-first traversal of dependencies, outputing to standard out.
 */
compiler.core.compiler = def(
  [
    compiler.config.configurator,
    compiler.output.outputter,
    compiler.load.loader,
    compiler.core.state,
    compiler.core.error,
    ephox.bolt.kernel.fp.functions
  ],

  function (configurator, outputter, loader, state, error, fn) {
    var store = state.create();

    global['define'] = store.define;

    var process = function (modulator, root, modules) {
      var load = fn.curry(loader.load, store, modulator, root);
      var ids = loader.analyse(store, modules);
      while (ids.length > 0) {
        ids.forEach(load);
        ids = loader.analyse(store, modules);
      }
      outputter.output(store, modules);
    };

    var compile = function (root, config, module, libraries) {
      libraries.forEach(require);
      var modulator = configurator.load(config);
      process(modulator, root, [module]);
    };

    return {
      compile: compile
    };
  }
);
