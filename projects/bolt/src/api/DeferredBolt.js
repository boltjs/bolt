define(
  'bolt.runtime.api.DeferredBolt',

  [
    'bolt.base.fp.Arr',
    'bolt.kernel.api.Config',
    'bolt.runtime.error.Error'
  ],

  function (Arr, Config, Error) {
    var notready = function () { throw 'bolt not initialised, can not call demand, did you mean to use require or main?'; };
    var alreadyconfigured = function () { throw 'bolt has already been configured, if you are sure you want to do this, you need to call reconfigure.'; };

    return function (configure, profile) {
      var runtime = {};
      var deferred = [];

      var delaydefine = function (id, dependencies, definition) {
        deferred.push(function (bolt) {
          bolt.define(id, dependencies, definition);
        });
      };

      var delayrequire = function (dependencies, f) {
        deferred.push(function (bolt) {
          bolt.require(dependencies, f);
        });
      };

      var main = function (id, args, configids, callback) {
        runtime.require(configids || [], function () {
          callback && callback.apply(null, arguments);
          runtime.require([ id ], function (module) {
            module.apply(null, args || []);
          });
        });
      };

      var configured = function (configuration) {
        var bolt = Config.configure(configuration, profile.builtins, Error.die);

        runtime.define = bolt.define;
        runtime.require = bolt.require;
        runtime.demand = bolt.demand;
        runtime.configure = alreadyconfigured;
        runtime.configured = alreadyconfigured;

        Arr.each(deferred, function (d) {
          return d(runtime);
        });

        deferred = [];
      };

      var reconfigure = function (configuration) {
        defer();
        configure(configuration);
      };

      var defer = function () {
        runtime.define = delaydefine;
        runtime.require = delayrequire;
        runtime.main = main;
        runtime.demand = notready;
        runtime.loadfile = profile.loadfile;
        runtime.loadscript = profile.loadscript;
        runtime.configure = configure;
        runtime.configured = configured;
        runtime.reconfigure = reconfigure;
      };

      defer();

      return runtime;
    };
  }
);
