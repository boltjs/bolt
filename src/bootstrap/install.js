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
      runtime.type = specs.type;
      runtime.modulator = specs.type; // FIX transitioning to type, kill after Wed 7th December.
      runtime.require = deferred.require;
      runtime.main = function (id, configs, callback) {
        runtime.require(configs || [], function () {
          callback && callback.apply(null, arguments);
          runtime.require([id], fn.apply);
        });
      };
    };

    return {
      install: install
    };
  }
);
