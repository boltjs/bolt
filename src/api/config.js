kernel.api.config = def(
  [
    kernel.module.manager
  ],

  function (manager) {
    var configure = function (regulator, onerror) {
      var engine = manager.create(regulator, onerror);

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
