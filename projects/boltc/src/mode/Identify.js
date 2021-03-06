define(
  'boltc.mode.Identify',

  [
    'boltc.tools.Error',
    'boltc.inspect.Identifier'
  ],

  function (Error, Identifier) {
    var run = function (file) {
      var ids = Identifier.identify(file);
      if (ids.length > 1)
        Error.die('File: ' + file + ', contained more than one module: [' + ids.join(', ') + ']');
      return ids[0];
    };

    return {
      run: run
    };
  }
);
