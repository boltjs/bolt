compiler.modulator.basic = def(
  [
    ephox.bolt.module.modulator.basic,
    compiler.tools.io
  ],

  function (delegate, io) {
    var create = function () {
      var instance = delegate.create.apply(null, arguments);

      var can = function () {
        return instance.can.apply(null, arguments);
      };

      var modulate = function () {
        var spec = instance.modulate.apply(null, arguments);

        var render = function () {
          return io.read(spec.url);
        };

        return {
          url: spec.url,
          serial: spec.serial,
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

// wrap basic modulator for compilation.
ephox.bolt.module.modulator.basic = compiler.modulator.basic;
