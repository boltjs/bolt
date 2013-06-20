module.modulator.library = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.kernel.util.globals,
    ephox.bolt.module.util.path
  ],

  function (ar, fn, globals, path) {
    var create = function (loader, pather, namespace, ref, initialization) {
      var exports = function (name) {
        var obj = globals.resolve(initialization.exports);
        if (initialization.cleanup === true)
          globals.remove(initialization.exports);
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
            ar.each(initialization.exportsAll, function(name) {
              obj[exports] = exports(name);
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
        var url = path.isAbsolute(ref) ? ref + '.js' : pather(ref) + '.js';

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
