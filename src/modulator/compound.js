kernel.modulator.compound = def(
  [
  ],

  function () {
    var create = function (oracle) {
      var can = function (id, demand) {
        var r = oracle(id, demand);
        return r.found !== undefined;
      };

      var modulate = function (id, define, require, demand) {
        var r = oracle(id, demand);
        if (r.notfound)
          throw 'assertion error: can should be used to validate before calls to modulate';
        return r.found.modulate(id, define, require, demand);
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
