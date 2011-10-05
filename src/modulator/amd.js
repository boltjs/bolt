kernel.modulator.amd = def(
  [
    kernel.fp.functions
  ],

  function (fn) {
    var create = function (namespace, path, idTransformer, loader) {
      var can = function (id) {
        return id.indexOf(namespace) === 0;
      };

      var modulate = function (id) {
        var url = path + "/" + idTransformer(id);
        var load = fn.curry(loader.load, url);

        return {
          url: url,
          load: load,
          serial: false
        };
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
