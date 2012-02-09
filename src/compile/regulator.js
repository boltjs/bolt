compiler.compile.regulator = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.api.regulator,
    compiler.compile.modulator,
    compiler.compile.source,
    compiler.oracle.compound
  ],

  function (ar, config, regulator, modulator, source, compound) {
    var load = function (configuration) {
      var modulators = modulator.types(configuration.modulators);
      var sources = source.build(modulators, configuration.sources);
      var oracle = compound.create(sources);
      return regulator.create(oracle);
    };

    return {
      load: load
    };
  }
);
