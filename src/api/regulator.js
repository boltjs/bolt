kernel.api.regulator = def(
  [
  ],

  function () {
    var create = function (oracle) {
      var can = function (id, demand) {
        var r = oracle(id, demand);
        return r.found !== undefined;
      };

      var regulate = function (id, define, require, demand) {
        var r = oracle(id, demand);
        if (r.notfound)
          throw 'assertion error: can should be used to validate before calls to regulate';
        return r.found.get(id, define, require, demand);
      };

      return {
        can: can,
        regulate: regulate
      };
    };

    return {
      create: create
    };
  }
);
