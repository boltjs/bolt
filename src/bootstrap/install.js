module.bootstrap.install = def(
  [
    module.error.error,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound,
    module.bootstrap.deferred,
    module.bootstrap.main
  ],

  function (error, config, compound, deferred, main) {
    var install = function (scope, pather) {
      var configure = function (configurator) {
        var modulators = configurator(pather);
        var modulator = compound.create(modulators);
        var bolt = config.configure(modulator, error.die);

        module.runtime.define = scope.define = bolt.define;
        module.runtime.require = scope.require = bolt.require;
        module.runtime.demand = scope.demand = bolt.demand;

        deferred.configured(scope.require);
      };

      module.runtime.configure = scope.configure = configure;
      module.runtime.require = scope.require = deferred.require;
      module.runtime.main = scope.main = main.main;
    };

    return {
      install: install
    };
  }
);
