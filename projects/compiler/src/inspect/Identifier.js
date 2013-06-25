bolt.compiler.inspect.Identifier = def(
  [
    bolt.compiler.tools.Io,
    bolt.compiler.tools.Error
  ],

  function (Io, Error) {
    var indentify = function (file) {
      var content = Io.read(file);
      var ids = [];
      // eval scope
      var define = function (id) {
        ids.push(id);
      };
      try {
        eval(content);
      } catch (e) {
        Error.die('Could not evaluate file: ' + file + ', error: ' + e);
      }
      return ids;
    };

    return {
      identify: indentify
    };
  }
);
