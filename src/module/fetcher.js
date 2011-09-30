kernel.module.fetcher = def(
  [
    kernel.fp.array
  ],

  function (ar) {
    var create = function (modulator) {
      var queue = {};  // url -> [callbacks]


      var fetch = function (ids, onsuccess, onerror) {
        if (!ar.forall(ids, modulator.can))
          onerror("don't know how to fetch");
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
