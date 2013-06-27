bolt.compiler.inspect.Metalator = def(
  [
    bolt.kernel.fp.Arr,
    bolt.compiler.tools.Io,
    bolt.compiler.tools.Error
  ],

  function (Arr, Io, Error) {
    var guard = function (content, file) {
      if (!hasMetadata(content))
        Error.die('no meta-data found for file, "' + file + '", can only link compile output');
    };

    var render = function (ids) {
      return '/*jsc\n' + JSON.stringify(ids) + '\njsc*/\n';
    };

    var hasMetadata = function (content) {
      return content.indexOf('/*jsc') === 0;
    };

    var inspect = function (content, file) {
      guard(content, file);
      var end = content.indexOf('jsc*/');
      if (end === -1)
        Error.die('Linking error: missing or invalid metadata for file, ' + file);
      var comment = content.substring(0, end);
      var json = comment.replace(/\/\*jsc/, '').replace(/jsc\*\//, '');
      return JSON.parse(json);
    };

    var boltmodules = function (file) {
      var content = Io.read(file);
      guard(content, file);
      var all = inspect(content, file);
      return Arr.filter(all, function (id) {
         return id.indexOf('!') === -1;
      });
    };

    var spec = function (file) {
      var content = Io.read(file);
      if (!hasMetadata(content))
        Error.die('no meta-data found for file, "' + file + '", can only link compile output');
      var defines = inspect(content, file);
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
