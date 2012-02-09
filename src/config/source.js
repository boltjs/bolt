module.config.source = def(
  [
    module.bootstrap.pather,
    ephox.bolt.kernel.fp.array
  ],

  function (pather, ar) {
    var find = function (id, sources) {
      for (var i = 0; i < sources.length; ++i)
        if (sources[i].can(id))
          return { found: sources[i] };
      return { notfound: true };
    };

    var get = function (spec, demand, modulatortypes) {
      var type = spec.type;
      var modulator = modulatortypes[type];
      if (modulator === undefined)
        throw 'Configuration error: no modulator for source: ' + type;
      return typeof modulator === 'string' ? demand(modulator) : modulator; // FIX type this so that we don't have to switch on id...
    };

    var initialise = function (demand, modulatorsources, modulatortypes, sourcespecs) {
      var sources = ar.map(sourcespecs, function (spec) {
        var modulator = get(spec, demand, modulatortypes);
        var p = pather.create(spec.relativeto);
        var args = [ p ].concat(spec.args);
        return modulator.create.apply(null, args);
      });
      return modulatorsources.concat(sources);
    };

    var build = function (modulatorsources, modulatortypes, sourcespecs) {
      return function (id, demand) {
        var r = find(id, modulatorsources);
        if (r.found !== undefined)
          return r;
        var sources = initialise(demand, modulatorsources, modulatortypes, sourcespecs);
        return find(id, sources);
      };
    };

    return {
      build: build
    };
  }
);
