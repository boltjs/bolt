module.api = def(
  [
    module.runtime
  ],
  
  function (runtime) {
    var delegate = function (method) {
      return function () {
        return runtime[method].apply(null, arguments);
      };
    };

    return {
      configure: delegate('configure'),
      modulator: delegate('modulator'),
      source: delegate('source'),
      mapper: delegate('mapper'),
      define: delegate('define'),
      require: delegate('require'),
      demand: delegate('demand'),
      main: delegate('main'),
      expose: delegate('expose')
    };
  }
);
