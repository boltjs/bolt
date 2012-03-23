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
      define: delegate('define'),
      require: delegate('require'),
      demand: delegate('demand'),
      main: delegate('main'),
      load: delegate('load'),
      loadscript: delegate('loadscript')
    };
  }
);
