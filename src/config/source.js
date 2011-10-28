module.config.source = def(
  [
    ephox.bolt.kernel.fp.array
  ],

  function (ar) {
    var find = function (id, sources) {
      for (var i = 0; i < sources.length; ++i)
        if (sources[i].can(id))
          return { found: sources[i] };
      return { notfound: true };
    };

    var get = function (spec, demand, modulatortypes) {
      var type = spec.type;
      var id = modulatortypes[type];
      if (id === undefined)
        throw 'Configuration error: no modulator for source: ' + type;
      return demand(id);
    };

    var initialise = function (demand, modulatorsources, modulatortypes, sourcespecs, pather) {
      var sources = ar.map(sourcespecs, function (spec) {
        var modulator = get(spec, demand, modulatortypes);
        var args = [ pather ].concat(spec.args);
        return modulator.create.apply(null, args);
      });
      return modulatorsources.concat(sources);
    };

    var build = function (modulatorsources, modulatortypes, sourcespecs, pather)  {
      return function (id, demand) {
        var r = find(id, modulatorsources);
        if (r.found !== undefined)
          return r;
        var sources = initialise(demand, modulatorsources, modulatortypes, sourcespecs, pather);
        return find(id, sources);
      };
    };
    
    return {
      build: build
    };
  }
);
