module.bootstrap.install = def(
  [
    module.error.error,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound,
    module.bootstrap.deferred,
    module.bootstrap.main,
    module.runtime
  ],

  function (error, config, compound, deferred, main, runtime) {
    var install = function (pather) {
      var configure = function (configurator) {
        var modulators = configurator(pather);
        var modulator = compound.create(modulators);
        var bolt = config.configure(modulator, error.die);

        runtime.define = bolt.define;
        runtime.require = bolt.require;
        runtime.demand = bolt.demand;

        deferred.configured(runtime.require);
      };

      runtime.configure = configure;
      runtime.require = deferred.require;
      runtime.main = main.main;
    };

    return {
      install: install
    };
  }
);
