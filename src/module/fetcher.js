kernel.module.fetcher = def(
  [
    kernel.fp.array,
    kernel.fp.functions,
    kernel.async.map,
    kernel.async.piggybacker
  ],

  function (ar, fn, map, piggybacker) {
    var create = function (modulator, validator) {
      var piggyback = piggybacker.create();

      var toSpecs = function (ids) {
        return ar.map(ids, function (id) {
          var spec = modulator.modulate(id);
          return { id: id, url: spec.url, load: spec.load, serial: spec.serial };
        });
      };

      var validate = function (onsuccess, onerror, results) {
        var failed = ar.filter(results, fn.not(validator));
        if (failed.length > 0)
          onerror('Fetcher error: modules were not defined: ' + failed.join(', '));
        else
          onsuccess();        
      };

      var mapper = function (spec, onresult) {
        var action = fn.curry(onresult, spec.id);
        piggyback.piggyback(spec.url, spec.load, action);
      };

      var asyncfetch = function (ids, onsuccess, onerror) {
        var specs = toSpecs(ids);
        var oncomplete = fn.curry(validate, onsuccess, onerror);
        // FIX: must stratify specs, run serial first.
        map.amap(specs, mapper, oncomplete);
      };

      var fetch = function (ids, onsuccess, onerror) {
        var cants = ar.filter(ids, fn.not(modulator.can));
        if (cants.length > 0)
          onerror('Fetcher error: do not know how to fetch: ' + cants.join(', '));
        else
          asyncfetch(ids, onsuccess, onerror);
      };

      return {
        fetch: fetch
      };
    };

    return {
      create: create
    };
  }
);
