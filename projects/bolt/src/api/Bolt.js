define(
  'bolt.runtime.api.Bolt',

  [

  ],

  function () {
    return function (runtime) {
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
        configure: delegate('configure'),
        reconfigure: delegate('reconfigure'),
        loadfile: delegate('loadfile'),
        loadscript: delegate('loadscript')
      };
    };
  }
);
