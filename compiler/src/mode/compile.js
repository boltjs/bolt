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
    var compile = function (source, files, target) {
      var modules = ar.flatmap(files, identifier.identify);
      var result = compiler().compile(source, modules);
      io.write(target, result);
    };

    var run = function (config, files, target, done) {
      reader.read(process.cwd() + '/.', config, function (configuration) {
        sources.build(configuration, function (source) {
          compile(source, files, target);
          done && done();
        });
      });
    };

    return {
      run: run
    };
  }
);
