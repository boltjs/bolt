compiler.compile.configurator = def(
  [
    ephox.bolt.kernel.modulator.compound,
    compiler.tools.io,
    compiler.tools.error,
    require('path')
  ],

  function (compound, io, error, path) {

    var load = function (file) {
      var content = io.read(file);

      var modulator;

      var pather = function (s) {
        var base = path.dirname(file);
        return base + '/' + s;
      };
      
      // scope for eval
      var configure = function (configurator) {
        var modulators = configurator(pather);
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
