compiler.compile.identifier = def(
  [
    compiler.tools.io
  ],

  function (io) {
    var indentify = function (file) {
      var content = io.read(file);
      var ids = [];
      // eval scope
      var define = function (id) {
        ids.push(id);
      };
      eval(content);
      return ids;
    };

    return {
      identify: indentify
    };
  }
);
