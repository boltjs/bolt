compiler.compile.configurator = def(
  [
    ephox.bolt.kernel.modulator.compound,
    compiler.tools.io,
    compiler.tools.error,
    compiler.modulator.amd,
    compiler.modulator.js,
    require('path')
  ],

  function (compound, io, error, amd, js, path) {

    var load = function (file) {
      var content = io.read(file);

      var pather = function (s) {
        var base = path.dirname(file);
        return base + '/' + s;
      };

      var builtins = {
        amd: amd,
        js: js
      };

      // scope for eval
      var modulator = function(type /*, args */) {
        if (builtins[type] === undefined)
          error.die(1, "no compile modulator for type: " + type);
        var args = Array.prototype.slice.call(arguments, 1);
        return builtins[type].create.apply(null, [ pather ].concat(args));
      };

      var instance;

      var configure = function (modulators) {
        instance = compound.create(modulators);
      };

      eval(content);

      if (instance === undefined)
        error.die(20, 'configuration did not contain define a modulator in file: ' + file);

      return instance;
    };

    return {
      load: load
    };
  }
);
