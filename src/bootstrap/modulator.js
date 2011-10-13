module.bootstrap.modulator = def(
  [
    module.error.error,
    module.modulator.amd,
    module.modulator.compiled,
    module.modulator.js
  ],

  function (error, amd, compiled, js) {
    var builtins = {
      amd: amd,
      compiled: compiled,
      js: js
    };

    // FIX MTH this needs to support arbitrary module ids as a type, implement delegating modulator to handle them.
    var modulator = function (pather) {
      return function(type /*, args */) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (builtins[type] === undefined)
          error.die('Configure error: modulator "' + type + '" is not supported');

        var all = [ pather ].concat(args);
        builtins[type].create.apply(null, all);
      };
    };

    return {
      modulator: modulator
    };
  }
);
