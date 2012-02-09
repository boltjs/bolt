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
    var configure = function (configuration, builtins) {
      var sources = modulator.sources(configuration.types);
      var types = modulator.types(builtins, configuration.types);
      var oracle = source.build(sources, types, configuration.sources);
      var r = regulator.create(oracle);
      var bolt = config.configure(r, error.die);
      return apiwrapper.api(bolt, configuration.types, types);
    };

    return {
      configure: configure
    };
  }
);
