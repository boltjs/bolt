compiler.compile.configurator = def(
  [
    ephox.bolt.kernel.modulator.compound,
    compiler.tools.io,
    compiler.tools.error
  ],

  function (compound, io, error) {

    var load = function (file) {
      var content = io.read(file);

      var modulator;

      // scope for eval
      var configure = function (modulators) {
        modulator = compound.create(modulators);
      };

      eval(content);

      if (modulator === undefined)
        error.die(20, 'configuration did not contain define a modulator in file: ' + file);

      return modulator;
    };

    return {
      load: load
    };
  }
);
