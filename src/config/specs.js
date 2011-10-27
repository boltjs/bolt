module.config.specs = def(
  [
  ],

  function () {
    var modulator = function (type, impl, path, mapper) {
      return {
        type: type,
        impl: impl,
        path: path,
        mapper: mapper
      }
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
