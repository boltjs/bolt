bolt.module.modulator.Library = def(
  [
    bolt.kernel.fp.Arr,
    bolt.kernel.util.Globals,
    bolt.kernel.util.Path
  ],

  function (Arr, Globals, Path) {
    var create = function (loader, pather, namespace, ref, initialization) {
      var exports = function (name) {
        var obj = Globals.resolve(name);
        if (initialization.cleanup === true)
          Globals.remove(name);
        return obj;
      };

      var definition = function () {
        if (initialization.define)
          return initialization.define;
        if (initialization.exports)
          return function () {
            return exports(initialization.exports);
          };
        if (initialization.exportsAll)
          return function () {
            var obj = {};
            Arr.each(initialization.exportsAll, function (name) {
              obj[name] = exports(name);
            });
            return obj;
          };
        return function () { return null; };
      };

      var wrapdefine = function (id, onsuccess, define) {
        return function () {
          define(id, [], definition());
          onsuccess();
        };
      };

      var can = function (id) {
        return id === namespace;
      };

      var get = function (id, define, require) {
        var url = Path.isAbsolute(ref) ? ref + '.js' : pather(ref) + '.js';

        var load = function (onsuccess, onfailure) {
          var wrapped = wrapdefine(id, onsuccess, define);
          require(initialization.depends || [], function () {
            loader.load(url, wrapped, onfailure);
          });
        };

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
