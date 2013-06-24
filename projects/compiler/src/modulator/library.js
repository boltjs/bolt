compiler.modulator.library = def(
  [
    compiler.inspect.metalator,
    compiler.tools.io,
    compiler.tools.error,
    ephox.bolt.loader.transporter.commonjs,
    ephox.bolt.module.util.path
  ],

  function (metalator, io, error, commonjs, path) {
    var create = function (pather, namespace, ref, initialization) {
      var can = function (id) {
        return id === namespace;
      };

      var nothing = function () {
        return '';
      };

      var definition = function () {
        if (initialization.define)
          return String(initialization.define);
        if (initialization.exports)
          return 'function () { return ' + initialization.exports + '; };'
        return 'function () { return null; }';
      };

      var get = function (id) {
        var isRemote = path.isAbsolute(ref)
        var url = isRemote ? ref + '.js' : pather(ref) + '.js';
        var content = '';

        var include = function (isRemote, path) {
          return function () {
            return content + '\n' +
              'ephox.bolt.module.api.define("' + id + '", [], ' + definition() + ');';
          };
        };

        var load = function (define, done) {
          commonjs.read(url, function (result) {
            var deps = initialization.compile !== false && initialization.depends ? initialization.depends : [];
            content = result;
            define(id, deps);
            done();
          }, error.die);
        };

        var render = initialization.compile !== false ? include(url) : nothing;

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
