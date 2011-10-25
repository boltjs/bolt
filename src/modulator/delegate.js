module.modulator.delegate = def(
  [
    module.api
  ],

  function () {
    var create = function (modulatorid /*, args */) {
      var args = Array.prototype.slice(arguments, 1);
      var instance;

      var modulator = function () {
        if (instance === undefined)
          instance = api.demand(modulatorid).create(args);
        return instance;
      };

      var can = function (id) {
        return modulator().can(id);
      };

      var modulate = function (id) {
        return modulator().modulate(id);
      };

      return {
        can: can,
        modulate: modulate
      };
    };

    return {
      create: create
    };
  }
);
