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
    var registry = function (files) {
      var ids = ar.flatmap(files, metalator.amdmodules);
      return ar.map(ids, function (id) {
        return 'register("' + id + '");';
      }).join('\n');
    };

    var readall = function (files) {
      var read = io.readall(files);
      return read.join('\n');
    };

    var run = function (config, invokemain, main, registermodules /*, files, target */) {
      var rest = Array.prototype.slice.call(arguments, 4);
      var files = rest.slice(0, -1);
      var target = rest[rest.length - 1];
      var result = readall(files);
      if (registermodules === "true" || invokemain !== "true")
        result += '\n' + registry(files);
      if (invokemain === "true")
        result += '\ndem("' + main + '")();';
      inline.generate(target, result);
    };

    return {
      run: run
    };
  }
);
