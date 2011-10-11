module.bootstrap.install = def(
  [
    module.error.error,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound,
    module.bootstrap.deferred,
    module.bootstrap.main,
    module.bootstrap.modulator,
    module.runtime
  ],

  function (error, config, compound, deferred, main, modulator, runtime) {
    var install = function (pather) {
      var configure = function (modulators) {
        var modulator = compound.create(modulators);
        var bolt = config.configure(modulator, error.die);

        runtime.define = bolt.define;
        runtime.require = bolt.require;
        runtime.demand = bolt.demand;

        deferred.configured(runtime.require);
      };

      runtime.configure = configure;
      runtime.modulator = modulator.modulator(pather);
      runtime.require = deferred.require;
      runtime.main = main.main;
    };

    return {
      install: install
    };
  }
);
