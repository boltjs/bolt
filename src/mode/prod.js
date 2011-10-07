compiler.mode.prod = def(
  [
    compiler.bootstrap.generator
  ],

  function (generator) {
    var run = function (bootstrap, config) {
      config = config || "module.js";
      var hookup = "ephox.bolt.module.bootstrap.prod.install('" + config + "');";
      generator.generate(bootstrap, hookup);
    };

    return {
      run: run
    };
  }
);