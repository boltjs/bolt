bolt.compiler.modulator.Bolt = def(
  [
    bolt.compiler.inspect.Metalator,
    bolt.compiler.tools.Io,
    bolt.compiler.tools.Error
  ],

  // FIX cleanup after compiled/bolt unify
  function (Metalator, Io, Error) {
    var create = function (pather, namespace, path, idTransformer) {

      var wrap = function (s) {
        return '(function (define, require, demand) {\n' +
          s + '\n' +
         '})(bolt.module.api.define, bolt.module.api.require, bolt.module.api.demand);\n';
      };

      var can = function (id) {
        return id.indexOf(namespace) === 0;
      };

      var get = function (id) {
        var file = pather(path) + "/" + idTransformer(id) + '.js';
        var content = Io.lazyread(file);

        var render = function () {
          return Metalator.hasMetadata(file) ? content() : wrap(content());
        };

        var loadcompiled = function (define) {
          var ids = Metalator.inspect(file);
          ids.forEach(function (id) {
            define(id, []);
          });
        };

        var loadmodule = function (define /* eval scope */) {
          try {
            eval(content());
          } catch (e) {
            Error.die('Could not evaluate file: ' + file + ', error: ' + e);
          }
        };

        var load = function (define, done) {
          var loader = Metalator.hasMetadata(file) ? loadcompiled : loadmodule;
          loader(define);
          done();
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
