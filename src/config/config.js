module.config.config = def(
  [
    module.error.error,
    module.config.modulator,
    module.config.source,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.api.regulator
  ],

  function (error, modulator, source, config, regulator) {
    var configure = function (configuration, builtins) {
      var types = modulator.types(builtins, configuration.types);
      var r = regulator.create(types, configuration.sources);
      return config.configure(r, error.die);
    };

    return {
      configure: configure
    };
  }
);
