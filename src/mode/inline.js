compiler.mode.inline = def(
  [
    compiler.tools.files,
    compiler.tools.io,
    compiler.tools.error,
    compiler.compile.identifier,
    compiler.compile.compiler,
    compiler.compile.configurator,
    compiler.compile.regulator,
    compiler.meta.metalator,
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.fp.functions
  ],

  function (filer, io, error, identifier, compiler, configurator, regulator, metalator, ar) {
    var defines = function (file) {
      if (!metalator.hasMetadata(file))
        error.die('no meta-data found for file, "' + file + '", can only link compile output');
      var all = metalator.inspect(file);
      return ar.filter(all, function (id) {
         return id.indexOf('!') === -1;
      });
    };

    var registry = function (ids) {
      return ar.map(ids, function (id) {
        return 'register("' + id + '");';
      }).join('\n');
    };
    var run = function (config, invokemain, main, registermodules /*, files, target */) {
      var rest = Array.prototype.slice.call(arguments, 1);
      var files = rest.slice(0, -1);
      var target = rest[rest.length - 1];
      var ids = ar.flatmap(files, defines);
      var read = io.readall(files);
      var result = read.join('\n');
      if (registermodules === "true" || invokemain !== "true")
        result += '\n' + registry(ids);
      if (invokemain === "true")
        result += '\ndem("' + main + '")();';
      var wrapped = wrap(result);
      io.write(target, wrapped);
    };

    var wrap = function (compiled) {
      var files = filer.files(__dirname, ['inline.js', 'inline.js.pre', 'inline.js.post']);
      var inline = files[0];
      var pre = files[1];
      var post = files[2];
      return [ pre, inline, compiled, post ].join('\n');
    };

    return {
      run: run
    };
  }
);
