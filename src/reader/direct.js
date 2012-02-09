module.reader.direct = def(
  [
  ],

  function () {
    var create = function (configuration) {
      var read = function (done) {
        done(configuration);
      };

      return {
        read: read
      };
    };

    return {
      create: create
    };
  }
);
