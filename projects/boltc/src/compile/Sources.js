define(
  'boltc.compile.Sources',

  [
    'bolt.base.fp.Arr',
    'bolt.base.util.Pather',
    'boltc.modulator.Globalator',
    'boltc.modulator.Bolt',
    'boltc.modulator.Library',
    'boltc.minibolt.Minibolt',
    'boltc.tools.Error'
  ],

  function (Arr, Pather, Globalator, Bolt, Library, Minibolt, Error) {
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
          var source = modulator.create.apply(null, [ Pather(spec.relativeto) ].concat(spec.args));
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
