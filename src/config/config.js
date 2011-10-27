module.config.config = def(
  [
    module.error.error,
    module.config.modulator,
    module.config.source,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound
  ],

  function (error, modulator, source, config, compound) {
    var configure = function (configuration, pather) {
      var modulatorspecs = configuration.modulators || [];
      var sourcespecs = configuration.sources || [];
      var modulators = modulator.modulators(modulatorspecs);
      var sources = source.sources(sourcespecs, modulators, pather);
      var combined = compound.create(sources);
      return config.configure(combined, error.die);
    };

    return {
      configure: configure
    };
  }
);
