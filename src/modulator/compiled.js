compiler.modulator.compiled = def(
  [
    ephox.bolt.module.modulator.modulators.compiled,
    compiler.tools.io
  ],

  function (delegate, io) {
    var create = function () {
      var instance = delegate.create.apply(null, arguments);

      var can = function () {
        return instance.can.apply(null, arguments);
      };

      var get = function (id) {
        var spec = instance.get.apply(null, arguments);
        var url = spec.url;
        var serial = spec.serial;

        var render = function () {
          return io.read(url);
        };

        var load = function (define) {
          // FIX sort out implicit definition behaviour.
          define(id, [], function () {});
        };

        return {
          serial: serial,
          url: url,
          load: load,
          render: render
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
