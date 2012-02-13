module.config.specs = def(
  [
    module.util.pather
  ],

  function (pather) {
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
          args: [ pather.create(relativeto) ].concat(Array.prototype.slice.call(arguments, 1))
        };
      }
    };

    return {
      type: type,
      source: source
    };
  }
);
