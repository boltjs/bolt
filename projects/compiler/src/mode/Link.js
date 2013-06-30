bolt.compiler.mode.Link = def(
  [
    bolt.compiler.tools.Error,
    bolt.compiler.generator.Bootstrap,
    bolt.compiler.inspect.Metalator,
    bolt.base.fp.Arr
  ],

  function (Error, Bootstrap, Metalator, Arr) {
    var path = require('path');

    var source = function (spec) {
      var name = path.basename(spec.file, '.js');
      return Arr.map(spec.defines, function (define) {
        return 'source("bolt", "' + define + '", ".", Mapper.constant("' + name + '"))';
      });
    };

    var run = function (config, files, target) {
      var specs = files.map(Metalator.spec);
      var sources = Arr.flatmap(specs, source);

      var install =
        '(function () {\n' +
        '  var Obj = bolt.base.fp.Obj;\n' +
        '  var Builtins = bolt.module.config.Builtins;\n' +
        '  var Install = bolt.module.bootstrap.Install;\n' +
        '  var Xhr = bolt.loader.transporter.Xhr;\n' +
        '  var ScriptTag = bolt.loader.api.ScriptTag;\n' +
        '  var Direct = bolt.module.reader.Direct;\n' +
        '  var Mapper = bolt.module.config.Mapper;\n' +
        '  var Locator = bolt.module.util.Locator;\n' +
        '  var source = bolt.module.config.Specs.source(Locator.locate());\n' +
        '  var reader = Direct.create({\n' +
        '    sources: [\n' +
        '      ' + sources.join(',\n      ') + '\n' +
        '    ]\n' +
        '  });\n' +
        '  Install.install(reader, Builtins.browser, Xhr.request, ScriptTag.load);\n' +
        '})();';

      Bootstrap.generate(target, install);
    };

    return {
      run: run
    };
  }
);
