module.bootstrap.install = def(
  [
    module.error.error,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound,
    module.bootstrap.main
  ],

  function (error, config, compound, main) {
    var install = function (scope, pather) {
      var configure = function (configurator) {
        var modulators = configurator(pather);
        var modulator = compound.create(modulators);
        var bolt = config.configure(modulator, error.die);

        scope.define = bolt.define;
        scope.require = bolt.require;
        scope.demand = bolt.demand;

        main.configured(scope.require);
      };

      scope.configure = configure;
    };

    return {
      install: install
    };
  }
);
