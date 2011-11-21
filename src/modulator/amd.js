kernel.modulator.amd = def(
  [
    kernel.fp.functions
  ],

  function (fn) {
    var create = function (loader, pather, namespace, path, idTransformer) {
      var can = function (id) {
        return id.indexOf(namespace) === 0;
      };

      var get = function (id) {
        var url = pather(path) + "/" + idTransformer(id) + '.js';
        var load = fn.curry(loader.load, url);

        return {
          url: url,
          load: load,
          serial: false
        };
      };

      return {
        can: can,
        get: get
      };
    };

    return {
      create: create
    };
  }
);
