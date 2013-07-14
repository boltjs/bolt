define(
  'bolt.runtime.config.Specs',

  [
  ],

  function () {
    var type = function (type, implementation) {
      return {
        type: type,
        implementation: implementation,
        modulator: implementation + '.Modulator',
        compiler: implementation + '.Compiler'
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
