kernel.modulator.amd = def(
  [
    kernel.fp.array,
    kernel.fp.functions
  ],

  function (arr, fn) {
    var create = function (loader, repositories, pather, namespace, path, idTransformer, repository) {
      var can = function (id) {
        return id === namespace || id.indexOf(namespace + '.') === 0;
      };

      var getlocal = function (id) {
        var url = pather(path) + "/" + idTransformer(id) + '.js';
        var load = fn.curry(loader.load, url);

        return {
          url: url,
          load: load,
          serial: false
        };
      };

      var getremote = function (id) {
        var cfg = arr.find(repositories, function (r) { return r.name = repository });

        if (cfg === undefined)
          throw "repository not configures [" + repository + "]";

        var url = cfg.remote + '/' + path + "/module/" + idTransformer(id) + '.js';
        var load = fn.curry(loader.load, url);

        return {
          url: url,
          load: load,
          serial: false
        };
      };

      var get = repository ? getremote : getlocal;

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
