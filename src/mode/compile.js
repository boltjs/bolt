compiler.mode.compile = def(
  [
    compiler.tools.io,
    compiler.inspect.identifier,
    compiler.compile.compiler,
    compiler.compile.sources,
    ephox.bolt.module.reader.node,
    ephox.bolt.kernel.fp.array
  ],

  function (io, identifier, compiler, sources, reader, ar) {
    var compile = function (configuration, files, source, target) {
      var modules = ar.flatmap(files, identifier.identify);
      var result = compiler.compile(source, modules);
      io.write(target, result);
    };

    var run = function (config/*, files, target*/) {
      var rest = Array.prototype.slice.call(arguments, 1);
      var files = rest.slice(0, -1);
      var target = rest[rest.length - 1];

      reader.read(process.cwd() + '/.', config, function (configuration) {
        sources.build(configuration, function (source) {
          compile(configuration, files, source, target);
        });
      });
    };

    return {
      run: run
    };
  }
);
