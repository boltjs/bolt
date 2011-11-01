compiler.modulator.amd = def(
  [
    ephox.bolt.module.modulator.modulators.amd,
    compiler.tools.io,
    compiler.tools.error
  ],

  function (delegate, io, error) {
    var create = function () {
      var instance = delegate.create.apply(null, arguments);

      var can = function () {
        return instance.can.apply(null, arguments);
      };

      var get = function (id) {
        var spec = instance.get.apply(null, arguments);

        var content = io.read(spec.url);

        var render = function () {
          return '(function (define, require, demand) {\n' +
               content + '\n' +
            '})(ephox.bolt.module.api.define, ephox.bolt.module.api.require, ephox.bolt.module.api.demand);\n';
        };

        var load = function (define /* eval scope */) {
          try {
            eval(content);
          } catch (e) {
            error.die('Could not evaluate file: ' + spec.url + ', error: ' + e);
          }
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
        get: get
      };
    };

    return {
      create: create
    };
  }
);
