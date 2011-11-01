compiler.compile.configurator = def(
  [
    ephox.bolt.module.config.specs,
    ephox.bolt.module.mapper.mapper,
    compiler.tools.io,
    compiler.tools.error
  ],

  function (specs, mapper, io, error) {
    var load = function (file, pather) {
      var result = {};

      // In scope for eval
      var mappers = mapper;
      var modulator = specs.modulator;
      var source = specs.source;
      var configure = function (configuration) {
        result = configuration;
      };
      try {
        eval(io.read(file));
      } catch (e) {
        error.die('Could not evaluate file: ' + file + ', error: ' + e);
      }
      return result;
    };

    return {
      load: load
    };
  }
);
