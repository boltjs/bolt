define(
  'bolt.kernel.api.Config',

  [
    'bolt.kernel.module.Manager',
    'bolt.kernel.api.Regulator',
    'bolt.kernel.api.Sources'
  ],

  function (Manager, Regulator, Sources) {
    var configure = function (configuration, builtins, onerror) {
      var s = Sources.create(builtins, configuration);
      var r = Regulator.create(s);
      var engine = Manager.create(r, onerror);

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
