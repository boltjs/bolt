kernel.module.fetcher = def(
  [
    kernel.fp.array,
    kernel.fp.functions,
    kernel.async.map,
    kernel.async.piggybacker,
    kernel.module.stratifier
  ],

  function (ar, fn, map, piggybacker, stratifier) {
    var create = function (modulator, validator, onerror, define, require) {
      var piggyback = piggybacker.create();

      var toSpecs = function (ids) {
        return ar.map(ids, function (id) {
          var spec = modulator.modulate(id, define, require);
          return { id: id, url: spec.url, load: spec.load, serial: spec.serial };
        });
      };

      var validate = function (onsuccess, results) {
        var failed = ar.filter(results, fn.not(validator));
        if (failed.length > 0)
          onerror('Fetcher error: modules were not defined: ' + failed.join(', '));
        else
          onsuccess();
      };

      var mapper = function (spec, onresult) {
        var action = fn.curry(onresult, spec.id);
        var load = function (callback) {
          spec.load(callback, onerror);
        };
        piggyback.piggyback(spec.url, load, action);
      };

      var asyncfetch = function (ids, onsuccess) {
        var specs = toSpecs(ids);
        var oncomplete = fn.curry(validate, onsuccess);
        var strata = stratifier.stratify(specs);
        map.amap(strata, mapper, oncomplete);
      };

      var fetch = function (ids, onsuccess) {
        var cants = ar.filter(ids, fn.not(modulator.can));
        if (cants.length > 0)
          onerror('Fetcher error: do not know how to fetch: ' + cants.join(', '));
        else
          asyncfetch(ids, onsuccess);
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
