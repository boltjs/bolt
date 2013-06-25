bolt.compiler.minibolt.Minibolt = def(
  [
    bolt.kernel.api.Config,
    bolt.module.config.Builtins,
    bolt.compiler.tools.Error
  ],

  function (Config, Builtins, Error) {
    var require = function (configuration, ids, onsuccess) {
      var bolt = Config.configure(configuration, Builtins.commonjs, Error.die);
      global.define = bolt.define;
      bolt.require(ids, function (/* modules */) {
        delete global.define;
        onsuccess(arguments);
      });
    };

    return {
      require: require
    };
  }
);
