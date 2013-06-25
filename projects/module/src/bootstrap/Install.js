bolt.module.bootstrap.Install = def(
  [
    bolt.kernel.api.Config,
    bolt.module.bootstrap.Deferred,
    bolt.module.bootstrap.Main,
    bolt.module.error.Error
  ],

  function (Config, Deferred, Main, Error) {
    var notready = function () { throw 'bolt not initialised, can not call define or demand, did you mean to use require or main?'; };

    var install = function (reader, builtins, load, loadscript) {
      var runtime = bolt.module.runtime;
      runtime.define = notready;
      runtime.demand = notready;
      runtime.require = Deferred.require;
      runtime.main = Main.main;
      runtime.load = load;
      runtime.loadscript = loadscript;

      reader(function (configuration) {
        var bolt = Config.configure(configuration, builtins, Error.die);
        runtime.define = bolt.define;
        runtime.require = bolt.require;
        runtime.demand = bolt.demand;

        Deferred.configured(runtime.require);
      });
    };

    return {
      install: install
    };
  }
);
