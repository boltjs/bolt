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

    var demand = function (configuration, id) {
      var bolt = create(configuration);
      global.define = bolt.define;
      bolt.require([ id ], function () {});
      delete global.define;
      return bolt.demand(id);
    };

    return {
      create: create,
      demand: demand
    };
  }
);
