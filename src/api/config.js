kernel.api.config = def(
  [
    kernel.module.manager
  ],

  function (manager) {
    var configure = function (modulator, onerror) {
      var engine = manager.create(modulator, onerror);

      return {
        define: engine.define,
        require: engine.require
      };
    };

    return {
      configure: configure
    };
  }
);
