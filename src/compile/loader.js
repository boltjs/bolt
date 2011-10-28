compiler.compile.loader = def(
  [
  ],

  function () {
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
        error.die('configuration did not contain define a modulator in file: ' + file);

      return modulator;
    };

    return {
      load: load
    };
  }
);
