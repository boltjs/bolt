compiler.compile.modulator = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound,
    ephox.bolt.module.modulator.globalator,
    ephox.bolt.module.config.modulator,
    compiler.config.source,
    compiler.loader.node,
    compiler.tools.error,
    compiler.modulator.amd,
    compiler.modulator.compiled
  ],

  function (ar, config, compound, globalator, modulator, source, node, error, amd, compiled) {
    var instantiate = function (source, id) {
      var bolt = config.configure(source, error.die);
      global.define = bolt.define;
      bolt.require([id], function () {});
      return bolt.demand(id);
    };

    var instances = function (specs, pather) {
      var is = {
        amd: amd,
        compiled: compiled
      };
      ar.each(specs, function (spec) {
        var source = modulator.source(spec, pather);
        is[spec.type] = instantiate(source, spec.compiler);
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
