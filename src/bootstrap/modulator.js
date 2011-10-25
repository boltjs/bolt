module.bootstrap.modulator = def(
  [
    module.error.error,
    module.modulator.amd,
    module.modulator.compiled,
    module.modulator.delegate,
    module.modulator.js
  ],

  function (error, amd, compiled, delegate, js) {
    var builtins = {
      amd: amd,
      compiled: compiled,
      js: js
    };

    var builtin = function (type, pather, args) {
      var all = [ pather ].concat(args);
      return builtins[type].create.apply(null, all);
    };

    var delegatee = function (type, pather, args) {
      var all = [ type, pather ].concat(args);
      return delegate.create.apply(null, all);
    };

    var modulator = function (pather) {
      return function(type /*, args */) {
        var args = Array.prototype.slice.call(arguments, 1);
        return builtins[type] !== undefined ? builtin(type, pather, args) : delegatee(type, pather, args);
      };
    };

    return {
      modulator: modulator
    };
  }
);
