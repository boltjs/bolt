compiler.mode.compile = def(
  [
    compiler.compile.identifier,
    compiler.compile.compiler,
    compiler.compile.configurator,
    ephox.bolt.kernel.fp.array
  ],

  function (identifier, compiler, configurator, ar) {
    var run = function (config/*, files, target*/) {
      var rest = Array.prototype.slice.call(arguments, 1);
      var files = rest.slice(0, -1);
      var target = rest[rest.length - 1];
      var modulator = configurator.load(config);
      var modules = ar.flatmap(files, identifier.identify);
      compiler.compile(modulator, modules, target, target + '.meta');
    };

    return {
      run: run
    };
  }
);
