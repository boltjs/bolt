compiler.modulator.compiled = def(
  [
    ephox.bolt.module.modulate.compiled,
    compiler.tools.io
  ],

  function (delegate, io) {
    var create = function () {
      var can = function () {
        return delegate.can.apply(null, arguments);
      };

      var modulate = function (id) {
        var spec = delegate.modulate.apply(null, arguments);
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
        modulate: modulate
      };
    };

    return {
      create: create
    };
  }
);
