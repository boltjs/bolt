kernel.modulator.compound = def(
  [
    kernel.fp.array,
    kernel.fp.object
  ],

  // FIX split, lift most of this into bolt module project.
  function (ar, obj) {
    // FIX store results, so that we don't always have to search?
    var create = function (prebuilt, modulatorlookup, sourcespecs, pather) {
      var sources = [].concat(prebuilt);

      // FIX drop define and require.
      var can = function (id, define, require, demand) {
        var r = maybe(id, demand);
        return r.found !== undefined;
      };

      var modulate = function (id, define, require, demand) {
        var r = maybe(id, demand);
        if (r.notfound)
          throw 'assertion error: can should be used to validate before calls to modulate';
        return r.found.modulate(id, define, require, demand);
      };

      var findsource = function (id) {
        for (var i = 0; i < sources.length; ++i)
          if (sources[i].can(id))
            return { found: sources[i] };
        return { notfound: true };
      };

      var createsources = function (demand) {
        for (var i = 0; i < sourcespecs.length; ++i) {
          var spec = sourcespecs[i];
          var type = spec.type;
          var modulatorid = modulatorlookup[type];
          if (modulatorid === undefined)
            throw 'Configuration error: no modulator for source: ' + type;
          var modulator = demand(modulatorid);
          var args = [ pather ].concat(spec.args);
          var source = modulator.create.apply(null, args);
          sources.push(source);
        }
      };

      var maybe = function (id, demand) {
        var r = findsource(id);
        if (r.found !== undefined)
          return r;
        createsources(demand);
        return findsource(id);
      };

      return {
        can: can,
        modulate: modulate
      };
    };

    return {
      create: create
    };
  }
);
