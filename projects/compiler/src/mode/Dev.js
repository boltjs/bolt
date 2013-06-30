bolt.compiler.mode.Dev = def(
  [
    bolt.compiler.generator.Bootstrap
  ],

  function (Bootstrap) {
    var run = function (config, bootstrap) {
      var path = require('path');
      var relative = path.relative(path.dirname(bootstrap), config);

      var hookup =
        '(function () {\n' +
        '  var Obj = bolt.base.fp.Obj;\n' +
        '  var Builtins = bolt.module.config.Builtins;\n' +
        '  var Install = bolt.module.bootstrap.Install;\n' +
        '  var Xhr = bolt.loader.transporter.Xhr;\n' +
        '  var ScriptTag = bolt.loader.api.ScriptTag;\n' +
        '  var reader = bolt.module.bootstrap.Configloader.script("' + relative + '");\n' +
        '  Install.install(reader, Builtins.browser, Xhr.request, ScriptTag.load);\n' +
        '  Obj.merge(window, bolt.module.api);\n' +
        '})();';
      Bootstrap.generate(bootstrap, hookup);
    };

    return {
      run: run
    };
  }
);
