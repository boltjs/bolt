compiler.minibolt.minibolt = def(
  [
    ephox.bolt.kernel.api.regulator,
    compiler.oracle.compound,
    compiler.tools.error
  ],

  function (regulator, compound, error) {
    var create = function (sources) {
      var oracle = compound.create(sources);
      var r = regulator.create(oracle);
      return config.configure(r, error.die);
    };

    var demand = function (sources, id) {
      var bolt = create(sources);
      global.define = bolt.define;
      bolt.require([id], function () {});
      delete global.define;
      return bolt.demand(id);
    };

    return {
      create: create,
      demand: demand
    };
  }
);
