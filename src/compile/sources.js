compiler.compile.sources = def(
  [
    ephox.bolt.kernel.fp.array,
    compiler.modulator.globalator,
    compiler.modulator.amd,
    compiler.minibolt.minibolt,
    compiler.tools.error
  ],

  function (ar, globalator, amd, minibolt, error) {
    var create = function (configuration) {
      var types = {};
      ar.each(configuration.types, function (spec) {
        types[spec.type] = minibolt.demand(configuration, spec.compiler);
      });
      types.amd = amd;

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

      return {
        can: can,
        load: load
      };
    };

    return {
      create: create
    };
  }
);
