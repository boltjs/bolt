define(
  'boltc.mode.Compile',

  [
    'boltc.tools.Io',
    'boltc.inspect.Identifier',
    'boltc.compile.Compiler',
    'boltc.compile.Sources',
    'bolt.runtime.reader.NodeReader',
    'bolt.base.fp.Arr'
  ],

  function (Io, Identifier, Compiler, Sources, NodeReader, Arr) {
    var compile = function (source, files, target, done) {
      var modules = Arr.flatmap(files, Identifier.identify);
      Compiler().compile(source, modules, function (result) {
        Io.write(target, result);
        done && done();
      });
    };

    var run = function (config, files, target, done) {
      NodeReader.read(process.cwd() + '/.', config, function (configuration) {
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
