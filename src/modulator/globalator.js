compiler.modulator.globalator = def(
  [
  ],

  function () {
    var create = function () {
      var can = function (id) {
        return id.indexOf('global!') === 0;
      };

      var modulate = function (id) {
        var globalid = id.substring('global!'.length);
        var render = function () {
          return 'ephox.bolt.module.api.define("' + id + '", [], function () { return ' + globalid + '; });';
        };

        var load = function (define) {
          // FIX sort out implicit definition behaviour.
          define(id, [], function () { return null; });
        };

        return {
          url: globalid,
          serial: false,
          render: render,
          load: load
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
