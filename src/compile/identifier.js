compiler.compile.identifier = def(
  [
    compiler.tools.io,
    compiler.tools.error
  ],

  function (io, error) {
    var indentify = function (regulator, file) {
      var content = io.read(file);
      var ids = [];
      // eval scope
      var define = function (id) {
        ids.push(id);
      };
      try {
        eval(content);
      } catch (e) {
        error.die('Could not evaluate file: ' + file + ', error: ' + e);
      }
      ids.forEach(function (id) {
        if (!regulator.can(id))
          error.die('Configuration error: configuration does not support loading id [' + id + '] from file [' + file + ']');
        var spec = regulator.regulate(id);
        if (!io.exists(spec.url))
          error.die('Configuration error: configuration does not support loading id [' + id + '] from file [' + file + ']');
      });
      return ids;
    };

    return {
      identify: indentify
    };
  }
);
