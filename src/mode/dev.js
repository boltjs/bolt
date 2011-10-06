compiler.mode.dev = def(
  [
    compiler.bootstrap.generator
  ],

  function (generator) {
    var run = function (bootstrap) {
      var hookup = "window.configure = ephox.bolt.module.bootstrap.configure.configure;";
      generator.generate(bootstrap, hookup);
    };

    return {
      run: run
    };
  }
);