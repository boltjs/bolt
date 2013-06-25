bolt.kernel.module.Fetcher = def(
  [
    bolt.kernel.fp.Arr,
    bolt.kernel.fp.Func,
    bolt.kernel.async.Map,
    bolt.kernel.async.Piggybacker,
    bolt.kernel.module.Stratifier
  ],

  function (Arr, Func, Map, Piggybacker, Stratifier) {
    var create = function (regulator, validator, onerror, define, require, demand) {
      var piggyback = Piggybacker.create();

      var validate = function (onsuccess, results) {
        var failed = Arr.filter(results, Func.not(validator));
        if (failed.length > 0)
          onerror('Fetcher error: modules were not defined: ' + failed.join(', '));
        else
          onsuccess();
      };

      var mapper = function (spec, onresult) {
        var action = Func.curry(onresult, spec.id);
        var load = function (callback) {
          spec.load(callback, onerror);
        };
        piggyback.piggyback(spec.url, load, action);
      };

      var asyncfetch = function (specs, onsuccess) {
        var oncomplete = Func.curry(validate, onsuccess);
        var strata = Stratifier.stratify(specs);
        Map.amap(strata, mapper, oncomplete);
      };

      var fetch = function (ids, onsuccess) {
        regulator.regulate(ids, define, require, demand, function (specs) {
          asyncfetch(specs, onsuccess);
        }, onerror);
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
