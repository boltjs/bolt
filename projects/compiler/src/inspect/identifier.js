compiler.inspect.identifier = def(
  [
    compiler.tools.io,
    compiler.tools.error
  ],

  function (io, error) {
    var indentify = function (file) {
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
      return ids;
    };

    return {
      identify: indentify
    };
  }
);
