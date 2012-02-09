module.bootstrap.install = def(
  [
    module.config.config,
    module.bootstrap.deferred,
    module.runtime
  ],

  function (config, deferred, runtime) {
    var notready = function () { throw 'bolt not initialised, can not call define or demand, did you mean to use require or main?'; };

    var install = function (reader, builtins, transport) {
      var main = function (id, args, configs, callback) {
        runtime.require(configs || [], function () {
          callback && callback.apply(null, arguments);
          runtime.require([id], function (module) {
            module.apply(null, args);
          });
        });
      };

      runtime.define = notready;
      runtime.demand = notready;
      runtime.require = deferred.require;
      runtime.main = main;
      runtime.load = transport;

      reader(function (configuration) {
        var bolt = config.configure(configuration, builtins);

        runtime.define = bolt.define;
        runtime.require = bolt.require;
        runtime.demand = bolt.demand;

        deferred.configured(runtime.require);
      });
    };

    return {
      install: install
    };
  }
);
