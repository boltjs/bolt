compiler.minibolt.minibolt = def(
  [
    ephox.bolt.kernel.api.regulator,
    ephox.bolt.kernel.api.config,
    ephox.bolt.module.config.builtins,
    ephox.bolt.module.config.modulator,
    compiler.tools.error
  ],

  function (regulator, config, builtins, modulator, error) {
    var create = function (configuration) {
      var types = modulator.types(builtins.commonjs, configuration.types);
      var r = regulator.create(types, configuration.sources);
      return config.configure(r, error.die);
    };

    var require = function (configuration, ids, onsuccess) {
      var bolt = create(configuration);
      global.define = bolt.define;
      bolt.require(ids, function (/* modules */) {
        delete global.define;
        onsuccess(arguments);
      });
    };

    return {
      create: create,
      require: require
    };
  }
);
