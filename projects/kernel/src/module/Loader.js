define(
  'bolt.kernel.module.Loader',

  [
    'bolt.kernel.module.Analyser'
  ],

  function (Analyser) {
    var load = function (roots, deps, fetcher, oncontinue, onsuccess, onerror) {
      var result = Analyser.analyse(roots, deps);
      if (result.cycle)
        onerror('Dependency error: a circular module dependency exists from ' + result.cycle.join(' ~> '));
      else if (result.load.length === 0)
        onsuccess();
      else
        fetcher.fetch(result.load, oncontinue);
    };

    return {
      load: load
    };
  }
);
