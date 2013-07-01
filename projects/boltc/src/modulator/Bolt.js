define(
  'boltc.modulator.Bolt',

  [
    'boltc.inspect.Metalator',
    'boltc.tools.Error',
    'bolt.base.util.Path',
    'bolt.loader.transporter.Node'
  ],

  // FIX cleanup after compiled/bolt unify
  function (Metalator, Error, Path, Node) {
    var create = function (pather, namespace, ref, idTransformer) {

      var wrap = function (s) {
        return '(function (define, require, demand) {\n' +
          s + '\n' +
         '})(bolt.module.api.define, bolt.module.api.require, bolt.module.api.demand);\n';
      };

      var can = function (id) {
        return id.indexOf(namespace) === 0;
      };

      var get = function (id) {
        var path = Path.isAbsolute(ref) ? ref : pather(ref);
        var url = path + "/" + idTransformer(id) + '.js';
        var content = '';

        var render = function () {
          return Metalator.hasMetadata(content) ? content : wrap(content);
        };

        var loadcompiled = function (define) {
          var ids = Metalator.inspect(content);
          ids.forEach(function (id) {
            define(id, []);
          });
        };

        var loadmodule = function (define /* eval scope */) {
          try {
            eval(content);
          } catch (e) {
            Error.die('Could not evaluate file: ' + file + ', error: ' + e);
          }
        };

        var load = function (define, done) {
          Node.read(url, function (result) {
            content = result;
            var loader = Metalator.hasMetadata(content) ? loadcompiled : loadmodule;
            loader(define);
            done();
          }, Error.die);
        };

        return {
          url: url,
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
