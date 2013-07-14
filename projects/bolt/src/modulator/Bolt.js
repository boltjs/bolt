define(
  'bolt.kernel.modulator.Bolt',

  [
    'bolt.base.fp.Func',
    'bolt.base.util.Path'
  ],

  function (Func, Path) {
    return function (loader, pather, namespace, ref, idTransformer) {

      var can = function (id) {
        return id === namespace || id.indexOf(namespace + '.') === 0;
      };

      var get = function (id) {
        var path = Path.isAbsolute(ref) ? ref : pather(ref);
        var url = path + "/" + idTransformer(id) + '.js';
        var load = Func.curry(loader.load, url);

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
  }
);
