module.bootstrap.install = def(
  [
     module.config.builtins,
    module.config.config,
    module.config.specs,
    module.mapper.mapper,
    module.bootstrap.deferred,
    module.runtime,
    ephox.bolt.kernel.fp.functions
  ],

  function (builtins, config, specs, mapper, deferred, runtime, fn) {
    var install = function (pather) {
      var configure = function (configuration) {
        var bolt = config.configure(configuration, pather, builtins.browser);

        runtime.define = bolt.define;
        runtime.require = bolt.require;
        runtime.demand = bolt.demand;

        deferred.configured(runtime.require);
      };

      runtime.configure = configure;
      runtime.source = specs.source;
      runtime.modulator = specs.modulator;
      runtime.require = deferred.require;
      runtime.main = function (id) {
        runtime.require([id], fn.apply);
      };
    };

    return {
      install: install
    };
  }
);
