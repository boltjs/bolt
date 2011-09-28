loader.executor.evaller = def(
  [
    ephox.bolt.kernel  // FIX
  ],

  function (kernel) {
    var execute = function(data, onsuccess, onfailure) {
      // Expose define function to script
      var define = kernel.define;

      try {
        eval(data);
      } catch(e) {
        onfailure(e);
        return;
      }

      onsuccess();
    };

    return {
      execute: execute
    };
  }
);
