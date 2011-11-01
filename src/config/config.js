module.config.config = def(
  [
    module.error.error,
    module.config.modulator,
    module.config.source,
    module.config.apiwrapper,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.api.regulator
  ],

  function (error, modulator, source, apiwrapper, config, regulator) {
    var configure = function (configuration, pather) {
      var sourcespecs = configuration.sources || [];
      var modulatorspecs = configuration.modulators || [];
      var modulatorsources = modulator.sources(modulatorspecs, pather);
      var modulatortypes = modulator.types(modulatorspecs);
      var oracle = source.build(modulatorsources, modulatortypes, sourcespecs, pather);
      var r = regulator.create(oracle);
      var bolt = config.configure(r, error.die);
      return apiwrapper.api(bolt, modulatorspecs, modulatortypes);
    };

    return {
      configure: configure
    };
  }
);
