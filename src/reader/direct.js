module.reader.direct = def(
  [
  ],

  function () {
    var create = function (configuration) {
      return function (done) {
        done(configuration);
      };
    };

    return {
      create: create
    };
  }
);
