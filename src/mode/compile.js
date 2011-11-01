compiler.mode.compile = def(
  [
    compiler.compile.identifier,
    compiler.compile.compiler,
    compiler.compile.configurator,
    compiler.compile.regulator,
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.module.util.path
  ],

  function (identifier, compiler, configurator, regulator, ar, fn, path) {
    var run = function (config/*, files, target*/) {
      var rest = Array.prototype.slice.call(arguments, 1);
      var files = rest.slice(0, -1);
      var target = rest[rest.length - 1];
      var pather = function (s) {
        return path.dirname(config) + '/' + s;
      };
      var configuration = configurator.load(config, pather);
      var r = regulator.load(configuration, pather);
      var identify = fn.curry(identifier.identify, r);
      var modules = ar.flatmap(files, identify);
      compiler.write(r, modules, target);
    };

    return {
      run: run
    };
  }
);
