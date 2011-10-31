compiler.modulator.amd = def(
  [
    ephox.bolt.module.modulator.modulators.amd,
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
          return '(function (define, require, demand) {\n' +
               content + '\n' +
            '})(ephox.bolt.module.api.define, ephox.bolt.module.api.require, ephox.bolt.module.api.demand);\n';
        };

        var load = function (define /* eval scope */) {
          eval(content);
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
