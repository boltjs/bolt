module.config.apiwrapper = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.fp.object
  ],

  function (ar, obj) {
    var modulatorids = function (specs, types) {
      var mids = ar.map(specs, function (spec) {
        return spec.modulator;
      });
      obj.each(types, function (k, v) {
        mids.push(v);
      });
      return mids;
    };

    /*
     * This wrapper lets us make sure that all modulators
     * have been loaded before any other modules are required.
     * The base set (amd, global) will just be defined (their code
     * has already been loaded); extra ones may be loaded as
     * amd modules (e.g. i18n).
     */
    var api = function (bolt, specs, types) {
      var mids = modulatorids(specs, types);
      var define = bolt.define;
      var demand = bolt.demand;
      var require = function (ids, callback) {
        bolt.require(mids, function () {
          bolt.require(ids, callback);
        });
      };

      return {
        define: define,
        require: require,
        demand: demand
      };
    };

    return {
      api: api
    };
  }
);
