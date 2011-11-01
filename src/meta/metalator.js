compiler.meta.metalator = def(
  [
    compiler.tools.io,
    compiler.tools.error
  ],

  function (io, error) {
    var render = function (ids) {
      return '/*jsc\n' + JSON.stringify(ids) + '\njsc*/\n';
    };

    var hasMetadata = function (file) {
      var content = io.read(file);
      return content.indexOf('/*jsc') === 0;
    };

    var inspect = function (file) {
      var content = io.read(file);
      var end = content.indexOf('jsc*/');
      if (end === -1)
        error.die('Linking error: missing or invalid metadata for file, ' + file);
      var comment = content.substring(0, end);
      var json = comment.replace(/\/\*jsc/, '').replace(/jsc\*\//, '');
      return JSON.parse(json);
    };

    return {
      render: render,
      hasMetadata: hasMetadata,
      inspect: inspect
    };
  }
);
