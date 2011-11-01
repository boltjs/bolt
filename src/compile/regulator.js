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
    var load = function (configuration, pather) {
      var modulatorspecs = configuration.modulators || [];
      var sourcespecs = configuration.sources || [];
      var modulators = modulator.types(modulatorspecs, pather);
      var sources = source.build(modulators, sourcespecs, pather);
      var oracle = compound.create(sources);
      return regulator.create(oracle);
    };

    return {
      load: load
    };
  }
);
