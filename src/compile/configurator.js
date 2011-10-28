compiler.compile.configurator = def(
  [
    ephox.bolt.module.config.specs,
    compiler.tools.io,
    compiler.tools.error,
    compiler.modulator.amd,
    compiler.modulator.compiled,
    compiler.modulator.js
  ],

  function (specs, io, error, amd, compiled, js) {
    var load = function (file, pather) {
      var result = {};
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
