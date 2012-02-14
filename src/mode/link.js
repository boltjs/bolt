compiler.mode.link = def(
  [
    compiler.tools.error,
    compiler.tools.io,
    compiler.generator.bootstrap,
    compiler.inspect.metalator,
    ephox.bolt.kernel.fp.array,
    require('path')
  ],

  function (error, io, generator, metalator, ar, path) {
    var source = function (spec) {
      var name = path.basename(spec.file, '.js');
      return ar.map(spec.defines, function (define) {
        return 'source("amd", "' + define + '", ".", mapper.constant("' + name + '"))';
      });
    };

    var run = function (config /*, files, target */) {
      var rest = Array.prototype.slice.call(arguments, 1);
      var files = rest.slice(0, -1);
      var target = rest[rest.length - 1];
      var specs = files.map(metalator.spec);
      var sources = ar.flatmap(specs, source);

      var install =
        '(function () {\n' +
        '  var install = ephox.bolt.module.bootstrap.install;\n' +
        '  var builtins = ephox.bolt.module.config.builtins.browser;\n' +
        '  var transport = ephox.bolt.loader.transporter.xhr.request;\n' +
        '  var direct = ephox.bolt.module.reader.direct;\n' +
        '  var reader = direct.create({\n' +
        '    sources: [\n' +
        '    ' + sources.join(',\n    ') + '\n' +
        '    ]\n' +
        '  });\n' +
        '  install.install(reader, builtins, transport);\n' +
        '})();';

      generator.generate(target, install);
    };

    return {
      run: run
    };
  }
);
