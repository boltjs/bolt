module.modulator.compiled = def(
  [
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.loader.api.scripttag
  ],

  function (fn, scripttag) {
    var create = function (pather, namespace, file) {
      var can = function (id) {
        return namespace === id;
      };

      var modulate = function (id, define, require) {
        var url = pather(file);
        var load = fn.curry(scripttag.load, url);
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
