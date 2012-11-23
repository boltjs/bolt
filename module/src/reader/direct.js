module.reader.direct = def(
  [
  ],

  function () {
    var create = function (configuration) {
      return function (done) {
        done({
          sources: configuration.sources || [],
          types: configuration.types || [],
          configs: configuration.configs || [],
          repositories: configuration.repositories || []
        });
      };
    };

    return {
      create: create
    };
  }
);
