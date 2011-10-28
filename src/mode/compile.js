compiler.mode.compile = def(
  [
    compiler.compile.identifier,
    compiler.compile.compiler,
    compiler.compile.configurator,
    compiler.compile.metalator,
    compiler.compile.modulator,
    ephox.bolt.kernel.fp.array,
    ephox.bolt.module.util.path
  ],

  function (identifier, compiler, configurator, metalator, modulator, ar, path) {
    var run = function (config/*, files, target*/) {
      var rest = Array.prototype.slice.call(arguments, 1);
      var files = rest.slice(0, -1);
      var target = rest[rest.length - 1];
      var pather = function (s) {
        return path.dirname(config) + '/' + s;
      };
      var configuration = configurator.load(config, pather);
      var m = modulator.load(configuration, pather);
      var modules = ar.flatmap(files, identifier.identify);
      compiler.write(m, modules, target);
      metalator.metalate(modules, target + '.meta');  
    };

    return {
      run: run
    };
  }
);
