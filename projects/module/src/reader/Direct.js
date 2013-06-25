bolt.module.reader.Direct = def(
  [
  ],

  function () {
    var create = function (configuration) {
      return function (done) {
        done({
          sources: configuration.sources || [],
          types: configuration.types || [],
          configs: configuration.configs || []
        });
      };
    };

    return {
      create: create
    };
  }
);
