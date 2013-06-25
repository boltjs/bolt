bolt.module.bootstrap.Main = def(
  [
  ],

  function () {
    var runtime = bolt.module.runtime;

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
