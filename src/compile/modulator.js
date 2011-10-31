compiler.compile.modulator = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.amd,
    ephox.bolt.kernel.modulator.compound,
    ephox.bolt.module.modulator.globalator,
    ephox.bolt.module.config.modulator,
    compiler.config.source,
    compiler.loader.node,
    compiler.tools.error,
    compiler.modulator.amd,
    compiler.modulator.compiled
  ],

  function (ar, fn, config, amd, compound, globalator, modulator, source, node, error, amdc, compiledc) {
    var instantiate = function (source, id) {
      var bolt = config.configure(source, error.die);
      global.define = bolt.define;
      bolt.require([id], function () {});
      return bolt.demand(id);
    };

    var instances = function (specs, pather) {
      var is = {
        amd: amdc,
        compiled: compiledc
      };
      var nodemodulators = {
        amd: {
          create: fn.curry(amd.create, node)
        }
      };
      ar.each(specs, function (spec) {
        var src = source.build(nodemodulators, [{type: 'amd', args: [spec.namespace, spec.path, spec.mapper]}], pather);
        is[spec.type] = instantiate(src, spec.compiler);
      });
      return is;
    };

    var load = function (configuration, pather) {
      var modulatorspecs = configuration.modulators || [];
      var sourcespecs = configuration.sources || [];
      var modulators = instances(modulatorspecs, pather);
      var oracle = source.build(modulators, sourcespecs, pather);
      return compound.create(oracle);
    };

    return {
      load: load
    };
  }
);
