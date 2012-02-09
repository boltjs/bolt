compiler.mode.compile = def(
  [
    compiler.tools.io,
    compiler.compile.identifier,
    compiler.compile.compiler,
    compiler.compile.configurator,
    compiler.compile.regulator,
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.fp.functions
  ],

  function (io, identifier, compiler, configurator, regulator, ar, fn) {
    var run = function (config/*, files, target*/) {
      var rest = Array.prototype.slice.call(arguments, 1);
      var files = rest.slice(0, -1);
      var target = rest[rest.length - 1];
      var configuration = configurator.load(config);
      var r = regulator.load(configuration);
      var identify = fn.curry(identifier.identify, r);
      var modules = ar.flatmap(files, identify);
      var result = compiler.compile(r, modules);
      io.write(target, result);
    };

    return {
      run: run
    };
  }
);
