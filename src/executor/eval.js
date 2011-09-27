loader.executor.eval = def(
  [
    ephox.bolt.kernel  // FIX
  ],

  function (kernel) {
    var execute = function(data, success, fail) {
      // Expose define function to script
      var define = kernel.define;

      try {
        eval(data);
      } catch(e) {
        fail(e);
        return;
      }
  
      success();
    };

    return {
      execute: execute
    };
  }
);
