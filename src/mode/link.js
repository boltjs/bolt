compiler.mode.link = def(
  [
    compiler.tools.error,
    compiler.tools.io,
    compiler.bootstrap.generator,
    compiler.inspect.metalator,
    ephox.bolt.kernel.fp.array,
    require('path')
  ],

  function (error, io, generator, metalator, ar, path) {
    var slurp = function (file) {
      if (!metalator.hasMetadata(file))
        error.die('no meta-data found for file, "' + file + '", can only link compile output');
      var defines = metalator.inspect(file);
      return {file: file, defines: defines};
    };

    var configthing = function (bit) {
      var defines = bit.defines;
      var filepath = bit.file;
      var name = path.basename(filepath, '.js');
      return defines.map(function (define) {
        return 'source("amd", "' + define + '", ".", mapper.constant("' + name + '"))';
      });
    };

    var link = function (files) {
      var bits = files.map(slurp);
      return ar.flatmap(bits, configthing);
    };

    var run = function (config /*, files, target */) {
      var rest = Array.prototype.slice.call(arguments, 1);
      var files = rest.slice(0, -1);
      var target = rest[rest.length - 1];
      var parts = link(files);
      var sources = parts.join(',\n    ');

      var install =
        '(function () {\n' +
        '  var install = ephox.bolt.module.bootstrap.install;\n' +
        '  var builtins = ephox.bolt.module.config.builtins.browser;\n' +
        '  var transport = ephox.bolt.loader.transporter.xhr.request;\n' +
        '  var direct = ephox.bolt.module.reader.direct;\n' +
        '  var reader = direct.create({\n' +
        '    sources: [\n' +
        '    ' + sources + '\n' +
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
