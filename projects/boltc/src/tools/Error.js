define(
  'boltc.tools.Error',

  [
  ],

  function () {
    var die = function (message, code) {
      console.error("error: " + message + "\n");
      process.exit(code || 1);
    };

    return {
      die: die
    };
  }
);
