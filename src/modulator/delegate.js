module.modulator.delegate = def(
  [
    module.api
  ],

  function (api) {
    var create = function (modulatorid /*, args */) {
      var args = Array.prototype.slice(arguments, 1);
      var instance = api.demand(modulatorid).create(args);

      var can = function (id) {
        return instance.can(id);
      };

      var modulate = function (id) {
        return instance.modulate(id);
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
