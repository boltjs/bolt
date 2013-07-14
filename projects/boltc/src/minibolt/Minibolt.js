define(
  'boltc.minibolt.Minibolt',

  [
    'bolt.kernel.api.Config',
    'bolt.runtime.api.DeferredBolt',
    'bolt.runtime.profile.NodeProfile'
  ],

  function (Config, DeferredBolt, NodeProfile) {
    var require = function (configuration, ids, onsuccess) {
      var configure = function (configuration) {};
      var bolt = DeferredBolt(configure, NodeProfile);
      bolt.configured(configuration);
      var olddefine = global.define;
      global.define = bolt.define;
      bolt.require(ids, function (/* modules */) {
        global.define = olddefine;
        onsuccess(arguments);
      });
    };

    return {
      require: require
    };
  }
);
