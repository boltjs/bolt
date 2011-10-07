compiler.mode.compile = def(
  [
    compiler.bootstrap.generator,
    compiler.compile.compiler,
    compiler.compile.configurator
  ],

  function (generator, compiler, configurator) {
    var run = function (config, outdir /*, mains */) {
      var mains = Array.prototype.slice.call(arguments, 2);

      // build a 'prod' config
      // write out bootstrap
      //    1. kernel
      //    2. loader
      //    3. module
      //    4. custom config
      //    5. call into module to kick things off.

      // FIX this needs to be a call into module
      var hookup = "";
      generator.generate(outdir + '/bootstrap.js', hookup);

      var modulator = configurator.load(config);

      var compile = function (main) {
        compiler.compile(modulator, main, outdir + '/' + main + '.js');
      };

      mains.forEach(compile);
    };

    return {
      run: run
    };
  }
);