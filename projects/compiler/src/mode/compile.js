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
    var compile = function (source, files, target, done) {
      var modules = ar.flatmap(files, identifier.identify);
      compiler().compile(source, modules, function (result) {
        io.write(target, result);
        done && done();
      });
    };

    var run = function (config, files, target, done) {
      reader.read(process.cwd() + '/.', config, function (configuration) {
        sources.build(configuration, function (source) {
          compile(source, files, target, done);
        });
      });
    };

    return {
      run: run
    };
  }
);
