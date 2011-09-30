kernel.module.loader = def(
  [
    kernel.module.analyser,
    kernel.module.fetcher
  ],

  function () {
    var load = function (ids, onsuccess, onerror) {
      var result = analyser(ids);

      if (result.cycle)
        onerror('Dependency error: a circular module dependency exists from ' +
            result.cycle.join(' ~> '));
      else if (result.load.length === 0)
        onsuccess();
      else
        fetch(result.load, function () {
          // FIX add some validation here.
          load(ids, onsuccess, onerror);
        }, onerror);
    };

    return {
      load: load
    };
  }
);