kernel.util.globals = def(
  [
  ],

  function () {
    var global = Function('return this')();

    var scoped = function (name, scope) {
      var parts = name.split('.');
      var r = scope;
      for (var i = 0; i < parts.length && r !== undefined; ++i)
        r = r[parts[i]];
      return r;
    };

    var resolve = function (name) {
      return scoped(name, global);
    };

    return {
      global: global,
      scoped: scoped,
      resolve: resolve
    };
  }
);
