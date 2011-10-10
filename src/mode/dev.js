compiler.mode.dev = def(
  [
    compiler.bootstrap.generator
  ],

  function (generator) {
    var run = function (bootstrap, config) {
      config = config || 'module.js';
      var hookup =
        '(function () {\n' +
        '  var pather = ephox.bolt.module.bootstrap.pather;\n' +
        '  var install = ephox.bolt.module.bootstrap.install;\n' +
        '  var configloader = ephox.bolt.module.bootstrap.configloader;\n' +
        '  install.install(window, pather.dev("' + config + '"));\n' +
        '  configloader.load("' + config + '");\n' +
        '})();';
      generator.generate(bootstrap, hookup);
    };

    return {
      run: run
    };
  }
);