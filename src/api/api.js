module.api = def(
  [
    module.runtime
  ],
  
  function (runtime) {
    var delegate = function (method) {
      return function () {
        runtime[method].apply(null, arguments);
      };
    };

    return {
      configure: delegate('configure'),
      modulator: delegate('modulator'),
      define: delegate('define'),
      require: delegate('require'),
      demand: delegate('demand'),
      main: delegate('main')
    };
  }
);
