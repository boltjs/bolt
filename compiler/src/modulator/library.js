compiler.modulator.library = def(
  [
    compiler.inspect.metalator,
    compiler.tools.io,
    compiler.tools.error,
    ephox.bolt.module.util.path
  ],

  function (metalator, io, error, path) {
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

      var local = function (url, done) {
        return done(io.read(url));
      };

      var remote = function (url, done) {
        var req = path.startsWith(url, "//") ? 'http:' + url : url;
        require('http').get(req, function (res) {
          var body = '';
          res.on('data', function (chunk) {
            body += chunk.toString();
          });
          res.on('end', function () {
            done(body);
          });
        })
      };

      var fetch = function (url, done) {
        return path.isAbsolute(ref) ? remote(url, done) : local(url, done)
      };

      var get = function (id) {
        var isRemote = path.isAbsolute(ref)
        var url = isRemote ? ref + '.js' : pather(ref) + '.js';
        var content = undefined;

        var include = function (isRemote, path) {
          return function () {
            var file = content !== undefined ? content : io.read(url);
            return file + '\n' +
              'ephox.bolt.module.api.define("' + id + '", [], ' + definition() + ');';
          };
        };

        var load = function (define, done) {
          fetch(url, function (result) {
            var deps = initialization.compile !== false && initialization.depends ? initialization.depends : [];
            content = result;
            define(id, deps);
            done();
          });
        };

        var render = initialization.compile !== false ? include(url) : nothing;

        return {
          url: url,
          serial: false,
          render: render,
          load: load
        };
        return get(id);
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
