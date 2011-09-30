kernel.module.fetcher = def(
  [
  ],

  function () {
    var create = function (modulator) {
      var queue = {};  // url -> [callbacks]


      var fetch = function (ids, onsuccess, onerror) {
        var can = ar.map(ids, modulator.can);
        if (!forall(can))
          onerror("don't know how to fetch, ?");
        else {
          var triples = ar.map(ids, modulator.modulate);
          var triplestodofirst = first(triple);
          async.parmap(triplestodofirst, function (triple) {
            var callback = function () {
              // validate
              // call everything else on the queue
            };
            if (queue[triple.url] !== undefined)
              queue[triple.url].push(callback);
            else {
              queue[triple.url] = [];
              triple.load(callback);
            }
          })
        }
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
