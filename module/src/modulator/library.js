module.modulator.library = def(
  [
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.kernel.util.globals,
    ephox.bolt.module.util.path
  ],

  function (fn, globals, path) {
    var create = function (loader, pather, namespace, ref, initialization) {

      var def = function () {
        if (initialization.define)
          return initialization.define;
        if (initialization.exports)
          return function () { return globals.resolve(initialization.exports); };
        return function () { return null; };
      };

      var wrapdefine = function (id, onsuccess, define) {
        return function () {
          define(id, [], def);
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
