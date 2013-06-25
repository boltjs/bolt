bolt.compiler.inspect.Metalator = def(
  [
    bolt.kernel.fp.Arr,
    bolt.compiler.tools.Io,
    bolt.compiler.tools.Error
  ],

  function (Arr, Io, Error) {
    var guard = function (file) {
      if (!hasMetadata(file))
        Error.die('no meta-data found for file, "' + file + '", can only link compile output');
    };

    var render = function (ids) {
      return '/*jsc\n' + JSON.stringify(ids) + '\njsc*/\n';
    };

    var hasMetadata = function (file) {
      var content = Io.read(file);
      return content.indexOf('/*jsc') === 0;
    };

    var inspect = function (file) {
      guard(file);
      var content = Io.read(file);
      var end = content.indexOf('jsc*/');
      if (end === -1)
        Error.die('Linking error: missing or invalid metadata for file, ' + file);
      var comment = content.substring(0, end);
      var json = comment.replace(/\/\*jsc/, '').replace(/jsc\*\//, '');
      return JSON.parse(json);
    };

    var boltmodules = function (file) {
      guard(file);
      var all = inspect(file);
      return Arr.filter(all, function (id) {
         return id.indexOf('!') === -1;
      });
    };

    var spec = function (file) {
      if (!hasMetadata(file))
        Error.die('no meta-data found for file, "' + file + '", can only link compile output');
      var defines = inspect(file);
      return { file: file, defines: defines };
    };

    return {
      render: render,
      hasMetadata: hasMetadata,
      inspect: inspect,
      boltmodules: boltmodules,
      spec: spec
    };
  }
);
