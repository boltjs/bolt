kernel.modulator.globalator = def(
  [
  ],

  function () {
    var create = function () {
      // FIX pull out
      var resolve = function (name, scope) {
        var parts = name.split('.');
        var r = scope;
        for (var i = 0; i < parts.length && r !== undefined; ++i)
          r = r[parts[i]];
        return r;
      };

      var global = Function('return this')();

      var can = function (id) {
        return id.indexOf('global!') === 0;
      };

      var get = function (id, define, require) {
        var name = id.substring('global!'.length);

        var load = function (onsuccess, onfailure) {
          var instance = resolve(name, global);
          if (instance !== undefined) {
            define(id, [], function () { return instance; });
            onsuccess();
          } else {
            onfailure('Modulator error: could not resolve global [' + name + ']');
          }
        };

        return {
          url: id, // this just needs to be unique, no download required.
          load: load,
          serial: true
        };
      };

      return {
        can: can,
        get: get
      }
    };
    return {
      create: create
    };
  }
);
