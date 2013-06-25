bolt.compiler.compile.Sources = def(
  [
    bolt.kernel.fp.Arr,
    bolt.compiler.modulator.Globalator,
    bolt.compiler.modulator.Bolt,
    bolt.compiler.modulator.Library,
    bolt.compiler.minibolt.Minibolt,
    bolt.compiler.tools.Error
  ],

  function (Arr, Globalator, Bolt, Library, Minibolt, Error) {
    var build = function (configuration, callback) {
      var modulatorids = Arr.map(configuration.types, function (spec) {
        return spec.compiler
      });

      Minibolt.require(configuration, modulatorids, function (modules) {
        var types = {};
        Arr.each(configuration.types, function (spec, i) {
          types[spec.type] = modules[i];
        });
        types.bolt = Bolt;
        // 'amd' is maintained for backwards compatibility, will be removed at some point.
        types.amd = Bolt;
        types.lib = Library;

        var sources = [ Globalator.create() ];

        Arr.each(configuration.sources, function (spec) {
          if (types[spec.type] === undefined)
            Error.die('Unknown modulator type [' + spec.type + ']');
          var modulator = types[spec.type];
          var source = modulator.create.apply(null, spec.args);
          sources.push(source);
        });

        var can = function (id) {
          for (var i = 0; i < sources.length; ++i)
            if (sources[i].can(id))
              return true;
          return false;
        };

        var load = function (id) {
          for (var i = 0; i < sources.length; ++i)
            if (sources[i].can(id))
              return sources[i].get(id);
          throw 'No sources found to load module [' + id + ']';
        };

        callback({
          can: can,
          load: load
        });
      });
    };

    return {
      build: build
    };
  }
);
