module.bootstrap.main = def(
  [
    ephox.bolt.kernel.api.config,
    module.bootstrap.deferred,
    module.runtime
  ],

  function (config, deferred, runtime) {
    var main = function (id, args, configids, callback) {
      runtime.require(configids || [], function () {
        callback && callback.apply(null, arguments);
        runtime.require([ id ], function (module) {
          module.apply(null, args || []);
        });
      });
    };

    return {
      main: main
    };
  }
);
