kernel.modulator.amd = def(
  [
  ],

  function () {
    var create = function (namespace, path, idTransformer, loader) {
      var can = function (id) {
        return id.indexOf(namespace) === 0;
      };

      var modulate = function (id) {
        var url = path + "/" + idTransformer(id);
        // FIX curry.
        var load = function (onsuccess, onfailure) {
          loader.load(url, onsuccess, onfailure);
        };

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