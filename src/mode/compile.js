compiler.mode.compile = def(
  [
    compiler.bootstrap.generator,
    compiler.compile.compiler,
    compiler.compile.configurator
  ],

  function (generator, compiler, configurator) {
    var run = function (config, outdir /*, mains */) {
      var mains = Array.prototype.slice.call(arguments, 2);

      var modulator = configurator.load(config);

      mains.forEach(function (main) {
        compiler.compile(modulator, main, outdir + '/' + main + '.js');
      });

      var hookup =
        '(function () {\n' +
        '  var pather = ephox.bolt.module.bootstrap.pather;\n' +
        '  var install = ephox.bolt.module.bootstrap.install;\n' +
        '  install.install(pather.compile());\n' +
        '})();';

      var modulators = mains.map(function (main) {
        return modulator.modulate(main).config();
      }).join(',\n  ');

      var configuration =
        'ephox.bolt.module.api.configure([\n' +
        '  ' + modulators + '\n' +
        ']);';

      generator.generate(outdir + '/bootstrap.js', hookup + '\n' + configuration);
    };

    return {
      run: run
    };
  }
);
