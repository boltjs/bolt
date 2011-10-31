compiler.compile.configurator = def(
  [
    ephox.bolt.module.config.specs,
    ephox.bolt.module.mapper.mapper,
    compiler.tools.io
  ],

  function (specs, mapper, io) {
    var load = function (file, pather) {
      var result = {};
      var mappers = mapper;
      var modulator = specs.modulator;
      var source = specs.source;
      var configure = function (configuration) {
        result = configuration;
      };
      eval(io.read(file));
      return result;
    };

    return {
      load: load
    };
  }
);
