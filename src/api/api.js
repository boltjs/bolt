module.api = def(
  [
    module.runtime,
    module.mapper.mapper
  ],
  
  function (runtime, mapper) {
    var delegate = function (method) {
      return function () {
        return runtime[method].apply(null, arguments);
      };
    };

    return {
      define: delegate('define'),
      require: delegate('require'),
      demand: delegate('demand'),
      main: delegate('main'),
      load: delegate('load')
    };
  }
);
