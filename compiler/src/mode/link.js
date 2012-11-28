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
        return 'source("bolt", "' + define + '", ".", mapper.constant("' + name + '"))';
      });
    };

    var run = function (config, files, target) {
      var specs = files.map(metalator.spec);
      var sources = ar.flatmap(specs, source);

      var install =
        '(function () {\n' +
        '  var install = ephox.bolt.module.bootstrap.install;\n' +
        '  var builtins = ephox.bolt.module.config.builtins.browser;\n' +
        '  var transport = ephox.bolt.loader.transporter.xhr.request;\n' +
        '  var script = ephox.bolt.loader.api.scripttag.load;\n' +
        '  var direct = ephox.bolt.module.reader.direct;\n' +
        '  var mapper = ephox.bolt.module.config.mapper;\n' +
        '  var locator = ephox.bolt.module.util.locator;\n' +
        '  var source = ephox.bolt.module.config.specs.source(locator.locate());\n' +
        '  var reader = direct.create({\n' +
        '    sources: [\n' +
        '      ' + sources.join(',\n      ') + '\n' +
        '    ]\n' +
        '  });\n' +
        '  install.install(reader, builtins, transport, script);\n' +
        '})();';

      generator.generate(target, install);
    };

    return {
      run: run
    };
  }
);
