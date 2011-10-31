kernel.modulator.compiled = def(
  [
    ephox.bolt.kernel.fp.functions
  ],

  function (fn) {
    var create = function (loader, pather, namespace, file) {
      var can = function (id) {
        return namespace === id;
      };

      var modulate = function (id, define, require) {
        var url = pather(file);
        var load = fn.curry(loader.load, url);

        return {
          serial: false,
          load: load,
          url: url
        };
      };

      return {
        can: can,
        modulate: modulate
      }
    };

    return {
      create: create
    };
  }
);
