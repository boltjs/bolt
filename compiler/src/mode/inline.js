compiler.mode.inline = def(
  [
    compiler.tools.files,
    compiler.tools.io,
    compiler.tools.error,
    compiler.inspect.metalator,
    compiler.generator.inline,
    ephox.bolt.kernel.fp.array
  ],

  function (filer, io, error, metalator, inline, ar) {
    var register = function (files) {
      var ids = ar.flatmap(files, metalator.amdmodules);
      return ar.map(ids, function (id) {
        return 'register("' + id + '");';
      }).join('\n');
    };

    var readall = function (files) {
      var read = io.readall(files);
      return read.join('\n');
    };

    var run = function (config, files, target, registermodules, main) {
      var result = readall(files);
      if (registermodules || main === undefined)
        result += '\n' + register(files);
      if (main !== undefined)
        result += '\ndem("' + main + '")();';
      inline.generate(target, result);
    };

    return {
      run: run
    };
  }
);
