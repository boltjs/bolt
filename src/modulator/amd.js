compiler.modulator.amd = def(
  [
    compiler.meta.metalator,
    compiler.tools.io,
    compiler.tools.error
  ],

  function (metalator, io, error) {
    var create = function (pather, namespace, path, idTransformer) {
      var can = function (id) {
        return id.indexOf(namespace) === 0;
      };

      var get = function (id) {
        var file = pather(path) + "/" + idTransformer(id);

        var render = function () {
          var content = io.read(file);
          return '(function (define, require, demand) {\n' +
               content + '\n' +
            '})(ephox.bolt.module.api.define, ephox.bolt.module.api.require, ephox.bolt.module.api.demand);\n';
        };

        var loadcompiled = function (define) {
          var ids = metalator.inspect(file);
          ids.forEach(function (id) {
            define(id, []);
          });
        };

        var loadmodule = function (define /* eval scope */) {
          var content = io.read(file);
          try {
            eval(content);
          } catch (e) {
            error.die('Could not evaluate file: ' + file + ', error: ' + e);
          }
        };

        var load = function (define) {
          var loader = metalator.hasMetadata(file) ? loadcompiled : loadmodule;
          loader(define);
        };

        return {
          url: file,
          serial: false,
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
