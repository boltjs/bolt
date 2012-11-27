compiler.mode.identify = def(
  [
    compiler.tools.error,
    compiler.inspect.identifier
  ],

  function (error, identifier) {
    var run = function (file) {
      var ids = identifier.identify(file);
      if (ids.length > 1)
        error.die('File: ' + file + ', contained more than one module: [' + ids.join(', ') + ']');
      return ids[0];
    };

    return {
      run: run
    };
  }
);
