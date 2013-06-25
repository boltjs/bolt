bolt.compiler.mode.Compile = def(
  [
    bolt.compiler.tools.Io,
    bolt.compiler.inspect.Identifier,
    bolt.compiler.compile.Compiler,
    bolt.compiler.compile.Sources,
    bolt.module.reader.Node,
    bolt.kernel.fp.Arr
  ],

  function (Io, Identifier, Compiler, Sources, Reader, Arr) {
    var compile = function (source, files, target, done) {
      var modules = Arr.flatmap(files, Identifier.identify);
      Compiler().compile(source, modules, function (result) {
        Io.write(target, result);
        done && done();
      });
    };

    var run = function (config, files, target, done) {
      Reader.read(process.cwd() + '/.', config, function (configuration) {
        Sources.build(configuration, function (source) {
          compile(source, files, target, done);
        });
      });
    };

    return {
      run: run
    };
  }
);
