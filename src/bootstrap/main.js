module.bootstrap.main = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.fp.functions
  ],

  function (ar, fn) {
    var main = function (id) {
      module.runtime.require([id], fn.apply);
    };

    return {
      main: main
    };
  }
);
