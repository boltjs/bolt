module.bootstrap.deferred = def(
  [
    ephox.bolt.kernel.fp.array
  ],

  function (ar) {
    var deferred = [];

    var require = function (ids, fn) {
      var r = function (real) {
        real(ids, fn);
      };
      deferred.push(r);
    };

    var configured = function (require) {
      ar.each(deferred, function (action) {
        action(require);
      });
    };

    return {
      require: require,
      configured: configured
    };
  }
);
