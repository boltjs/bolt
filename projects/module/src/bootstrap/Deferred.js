bolt.module.bootstrap.Deferred = def(
  [
    bolt.kernel.fp.Arr
  ],

  function (Arr) {
    var deferred = [];

    var require = function (ids, fn) {
      var r = function (real) {
        real(ids, fn);
      };
      deferred.push(r);
    };

    var configured = function (require) {
      Arr.each(deferred, function (action) {
        action(require);
      });
      deferred = [];
    };

    return {
      require: require,
      configured: configured
    };
  }
);
