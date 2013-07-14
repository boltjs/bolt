define(
  'bolt.runtime.entry.NodeMain',

  [
    'bolt.runtime.api.Bolt',
    'bolt.runtime.api.DeferredBolt',
    'bolt.runtime.profile.NodeProfile',
    'bolt.runtime.reader.Reader'
  ],

  function (Bolt, DeferredBolt, NodeProfile, Reader) {
    return function () {
      var configure = function (configuration) {
        Reader.node(configuration, deferred.configured);
      };

      var deferred = DeferredBolt(configure, NodeProfile);
      var bolt = Bolt(deferred);

      module.exports = bolt;
    };
  }
);
