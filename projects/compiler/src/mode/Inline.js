bolt.compiler.mode.Inline = def(
  [
    bolt.compiler.tools.Io,
    bolt.compiler.tools.Error,
    bolt.compiler.inspect.Metalator,
    bolt.compiler.generator.Inline,
    bolt.kernel.fp.Arr
  ],

  function (Io, Error, Metalator, Inline, Arr) {
    var register = function (files) {
      var ids = Arr.flatmap(files, Metalator.boltmodules);
      return Arr.map(ids, function (id) {
        return 'register("' + id + '");';
      }).join('\n');
    };

    var readall = function (files) {
      var read = Io.readall(files);
      return read.join('\n');
    };

    var run = function (config, files, target, registermodules, main) {
      var result = readall(files);
      if (registermodules || main === undefined)
        result += '\n' + register(files);
      if (main !== undefined)
        result += '\ndem("' + main + '")();';
      Inline.generate(target, result);
    };

    return {
      run: run
    };
  }
);
