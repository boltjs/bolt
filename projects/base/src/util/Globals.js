bolt.base.util.Globals = def(
  [
  ],

  function () {
    var global = Function('return this')();

    var get = function (parts, scope) {
      var r = scope;
      for (var i = 0; i < parts.length && r !== undefined; ++i)
        r = r[parts[i]];
      return r;
    };

    var resolve = function (name, scope) {
      var parts = name.split('.');
      return get(parts, scope || global);
    };

    var remove = function (name, scope) {
      var parts = name.split('.');
      var parent = get(parts.slice(0, -1), scope || global);
      delete parent[parts[parts.length - 1]];
    };

    return {
      global: global,
      resolve: resolve,
      remove: remove
    };
  }
);
