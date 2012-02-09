module.config.specs = def(
  [
  ],

  function () {
    var type = function (type, implementation, sources) {
      return {
        type: type,
        implementation: implementation,
        modulator: implementation + '.Modulator',
        compiler: implementation + '.Compiler',
        sources: sources
      };
    };

    var source = function (relativeto) {
      return function (type /*, args */) {
        return {
          type: type,
          relativeto: relativeto,
          args: Array.prototype.slice.call(arguments, 1)
        };
      }
    };

    return {
      type: type,
      source: source
    };
  }
);
