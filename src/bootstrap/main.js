module.bootstrap.main = def(
  [
    ephox.bolt.kernel.fp.array
  ],

  function (ar) {
    var mains = [];
    var loaded = false;

    var requires;

    var configured = function(require) {
      requires = require;
      loaded = true;
      ar.each(mains, function(main) {
        main(require);
      });
      mains = [];
    };

    var requirer = function (id) {
      return function (require) {
        require([id], function (module) {
          module();
        });
      };
    };

    var main = function (id) {
      var r = requirer(id);
      if (loaded)
        r(requires);
      else
        mains.push(r);
    };

    return {
      main: main,
      configured: configured
    };
  }
);
