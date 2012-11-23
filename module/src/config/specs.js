module.config.specs = def(
  [
    module.util.pather
  ],

  function (pather) {
    var repository = function (name, remote, local) {
      return {
        name: name,
        remote: remote,
        local: local
      };
    };

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
      repository: repository,
      type: type,
      source: source
    };
  }
);
