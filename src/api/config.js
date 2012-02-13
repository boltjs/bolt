kernel.api.config = def(
  [
    kernel.module.manager,
    kernel.api.regulator,
    kernel.api.sources
  ],

  function (manager, regulator, sources) {
    var configure = function (configuration, builtins, onerror) {
      var s = sources.create(builtins, configuration);
      var r = regulator.create(s);
      var engine = manager.create(r, onerror);

      return {
        define: engine.define,
        require: engine.require,
        demand: engine.demand
      };
    };

    return {
      configure: configure
    };
  }
);
