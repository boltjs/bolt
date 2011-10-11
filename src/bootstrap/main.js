module.bootstrap.main = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.fp.functions,
    module.runtime
  ],

  function (ar, fn, runtime) {
    var main = function (id) {
      runtime.require([id], fn.apply);
    };

    return {
      main: main
    };
  }
);
