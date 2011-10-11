module.bootstrap.modulator = def(
  [
    module.error.error,
    module.modulator.amd,
    module.modulator.js
  ],

  function (error, amd, js) {
    var modulator = function (pather) {
      return function(type /*, args */) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (type === 'amd' || type === 'js') {
          var factory = type === 'amd' ? amd : js;
          return factory.create.apply(null, [ pather ].concat(args));
        }

        // FIX: allow other types
        error.die('Configure error: modulator "' + type + '" is not supported');
      };
    };

    return {
      modulator: modulator
    };
  }
);
