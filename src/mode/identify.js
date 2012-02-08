compiler.mode.identify = def(
  [
    compiler.tools.io,
    compiler.tools.error
  ],

  function (io, error) {
    var run = function (file) {
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

      if (ids.length > 0)
        error.die('File: ' + file + ', contained more than one module: [' + ids.join(', ') + ']');

      console.log(ids[0]);
    };

    return {
      run: run
    };
  }
);
