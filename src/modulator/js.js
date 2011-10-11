kernel.modulator.js = def(
  [
    kernel.fp.functions
  ],

  function (fn) {
    var create = function (prefix, path, loader) {
      var can = function (id) {
        return id.indexOf("js!" + prefix + ":") === 0;
      };

      var modulate = function (id) {
        var length = ("js!" + prefix + ":").length;
        var url = path + '/' + id.substring(length);
        var load = fn.curry(loader.load, url);

        return {
          url: url,
          load: load,
          serial: true
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
