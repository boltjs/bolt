compiler.minibolt.minibolt = def(
  [
    ephox.bolt.kernel.api.config,
    ephox.bolt.module.config.builtins,
    compiler.tools.error
  ],

  function (config, builtins, error) {
    var require = function (configuration, ids, onsuccess) {
      var bolt = config.configure(configuration, builtins.commonjs, error.die);
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
