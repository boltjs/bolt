kernel.module.loader = def(
  [
    kernel.module.analyser
  ],

  function (analyser) {
    var load = function (deps, fetcher, oncontinue, onsuccess, onerror) {
      var result = analyser.analyse(deps);

      if (result.cycle)
        onerror('Dependency error: a circular module dependency exists from ' +
            result.cycle.join(' ~> '));
      else if (result.load.length === 0)
        onsuccess();
      else
        fetcher.fetch(result.load, function () {
          oncontinue();
        }, onerror);
    };

    return {
      load: load
    };
  }
);