// This is currently right, need to do more to move api.
bolt.module.api = def(
  [

  ],

  function (runtime) {
    var delegate = function (method) {
      return function () {
        return bolt.module.runtime[method].apply(null, arguments);
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
