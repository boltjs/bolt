compiler.mode.dev = def(
  [
    compiler.bootstrap.generator
  ],

  // FIX dedupe with compiler.mode.prod
  function (generator) {
    var run = function (bootstrap, config) {
      config = config || "module.js";
      var hookup = "ephox.bolt.module.bootstrap.dev.install('" + config + "');";
      generator.generate(bootstrap, hookup);
    };

    return {
      run: run
    };
  }
);