compiler.mode.dev = def(
  [
    compiler.bootstrap.generator
  ],

  function (generator) {
    var run = function (bootstrap) {
      var hookup = "ephox.bolt.module.bootstrap.configure.install();";
      generator.generate(bootstrap, hookup);
    };

    return {
      run: run
    };
  }
);