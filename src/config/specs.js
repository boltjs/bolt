module.config.specs = def(
  [
  ],

  function () {
    var modulator = function (type, namespace, path, mapper) {
      return {
        type: type,
        namespace: namespace,
        modulator: namespace + '.Modulator',
        compiler: namespace + '.Compiler',
        path: path,
        mapper: mapper
      };
    };

    var source = function (type /*, args */) {
      return {
        type: type,
        args: Array.prototype.slice.call(arguments, 1)
      };
    };

    return {
      modulator: modulator,
      source: source
    };
  }
);
