module.bootstrap.install = def(
  [
    ephox.bolt.kernel.api.config,
    module.bootstrap.deferred,
    module.bootstrap.main,
    module.runtime,
    module.error.error
  ],

  function (config, deferred, main, runtime, error) {
    var notready = function () { throw 'bolt not initialised, can not call define or demand, did you mean to use require or main?'; };

    var install = function (reader, builtins, load, loadscript) {
      runtime.define = notready;
      runtime.demand = notready;
      runtime.require = deferred.require;
      runtime.main = main.main;
      runtime.load = load;
      runtime.loadscript = loadscript;

      reader(function (configuration) {
        var bolt = config.configure(configuration, builtins, error.die);
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

