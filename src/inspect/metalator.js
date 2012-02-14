compiler.inspect.metalator = def(
  [
    ephox.bolt.kernel.fp.array,
    compiler.tools.io,
    compiler.tools.error
  ],

  function (ar, io, error) {
    var guard = function (file) {
      if (!metalator.hasMetadata(file))
        error.die('no meta-data found for file, "' + file + '", can only link compile output');
    };

    var render = function (ids) {
      return '/*jsc\n' + JSON.stringify(ids) + '\njsc*/\n';
    };

    var hasMetadata = function (file) {
      var content = io.read(file);
      return content.indexOf('/*jsc') === 0;
    };

    var inspect = function (file) {
      guard(file);
      var content = io.read(file);
      var end = content.indexOf('jsc*/');
      if (end === -1)
        error.die('Linking error: missing or invalid metadata for file, ' + file);
      var comment = content.substring(0, end);
      var json = comment.replace(/\/\*jsc/, '').replace(/jsc\*\//, '');
      return JSON.parse(json);
    };

    var amdmodules = function (file) {
      guard(file);
      var all = metalator.inspect(file);
      return ar.filter(all, function (id) {
         return id.indexOf('!') === -1;
      });
    };

    var spec = function (file) {
      if (!metalator.hasMetadata(file))
        error.die('no meta-data found for file, "' + file + '", can only link compile output');
      var defines = metalator.inspect(file);
      return {file: file, defines: defines};
    };

    return {
      render: render,
      hasMetadata: hasMetadata,
      inspect: inspect,
      amdmodules: amdmodules,
      spec: spec
    };
  }
);
