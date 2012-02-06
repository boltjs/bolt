module.bootstrap.install = def(
  [
    module.config.builtins,
    module.config.config,
    module.config.specs,
    module.mapper.mapper,
    module.bootstrap.deferred,
    module.runtime
  ],

  function (builtins, config, specs, mapper, deferred, runtime) {
    var install = function (pather) {
      var configure = function (configuration) {
        var bolt = config.configure(configuration, pather, builtins.browser);

        runtime.define = bolt.define;
        runtime.require = bolt.require;
        runtime.demand = bolt.demand;

        deferred.configured(runtime.require);
      };

      var main = function (id, args, configs, callback) {
        runtime.require(configs || [], function () {
          callback && callback.apply(null, arguments);
          runtime.require([id], function (module) {
            module.apply(null, args);
          });
        });
      };

      runtime.configure = configure;
      runtime.source = specs.source;
      runtime.type = specs.type;
      runtime.modulator = specs.type; // FIX transitioning to type, kill after Wed 7th December.
      runtime.require = deferred.require;
      runtime.main = main;
    };

    return {
      install: install
    };
  }
);
