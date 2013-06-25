bolt.compiler.tools.Error = def(
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
