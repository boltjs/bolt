module.bootstrap.install = def(
  [
    module.error.error,
    module.config.config,
    module.mapper.mapper,
    module.bootstrap.deferred,
    module.bootstrap.main,
    module.runtime
  ],

  function (error, config, mapper, deferred, main, runtime) {
    var install = function (pather) {
      var configure = function (configuration) {
        var bolt = config.configure(configuration, pather);

        runtime.define = bolt.define;
        runtime.require = bolt.require;
        runtime.demand = bolt.demand;

        deferred.configured(runtime.require);
      };

      var main = function (id) {
        runtime.require([id], fn.apply);
      };

      runtime.configure = configure;
      runtime.source = modulator.source;
      runtime.modulator = modulator.modulator;
      runtime.mapper = mapper;
      runtime.require = deferred.require;
      runtime.main = main;
    };

    return {
      install: install
    };
  }
);
