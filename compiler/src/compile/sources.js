compiler.compile.sources = def(
  [
    ephox.bolt.kernel.fp.array,
    compiler.modulator.globalator,
    compiler.modulator.bolt,
    compiler.minibolt.minibolt,
    compiler.tools.error
  ],

  function (ar, globalator, bolt, minibolt, error) {
    var build = function (configuration, callback) {
      var modulatorids = ar.map(configuration.types, function (spec) {
        return spec.compiler
      });

      minibolt.require(configuration, modulatorids, function (modules) {
        var types = {};
        ar.each(configuration.types, function (spec, i) {
          types[spec.type] = modules[i];
        });
        types.bolt = bolt;
        // TODO: 'amd' is maintained for backwards compatibility, will be
        // removed at some point.
        types.amd = bolt;

        var sources = [ globalator.create() ];

        ar.each(configuration.sources, function (spec) {
          if (types[spec.type] === undefined)
            error.die('Unknown modulator type [' + spec.type + ']');
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
