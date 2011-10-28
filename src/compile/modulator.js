compiler.compile.modulator = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.amd,
    ephox.bolt.kernel.modulator.compound,
    ephox.bolt.module.config.modulator,
    ephox.bolt.module.config.source,
    compiler.loader.node,
    compiler.tools.error
  ],

  function (ar, config, amd, compound, modulator, source, node, error) {

    var load = function (configuration, pather) {
      var maker = function (spec) {
        // FIX pull out
        var source = amd.create(pather, spec.impl, spec.path, spec.mapper, node);
        var bolt = config.configure(source, error.die);
        var id = spec.impl + '.Compiler';
        global.define = bolt.define;
        var instance;
        // FIX we know this is synchronous because of node loader, we probably need a demand that will let us load things synchronously
        bolt.require([id], function (modulator) {
          instance = modulator;
        });

        return function (/* supplied */) {
          return instance.create.apply(null, arguments);
        };
      };

      var builtins = {
        amd: compiler.modulator.amd.create,
        compiled: compiler.modulator.compiled.create,
        js: compiler.modulator.js.create
      };

      // FIX dedupe
      var modulatorspecs = configuration.modulators || [];
      var sourcespecs = configuration.sources || [];
      var modulators = modulator.modulators(modulatorspecs, builtins, maker);
      var sources = source.sources(sourcespecs, modulators, pather);
      return compound.create(modulators, sources);
    };

    return {
      load: load
    };
  }
);
