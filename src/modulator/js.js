compiler.modulator.js = def(
  [
    ephox.bolt.module.modulator.js,
    compiler.tools.io
  ],

  function (delegate, io) {
    var create = function () {
      var instance = delegate.create.apply(null, arguments);

      var can = function () {
        return instance.can.apply(null, arguments);
      };

      var modulate = function (id) {
        var spec = instance.modulate.apply(null, arguments);

        var content = io.read(spec.url);

        var render = function () {
          return content + '\n' +
             'ephox.bolt.module.runtime.define("' + id + '", [], function () { return null; });';
        };

        var load = function (define) {
          define(id, [], function () { return null; });
        };

        return {
          url: spec.url,
          serial: spec.serial,
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
