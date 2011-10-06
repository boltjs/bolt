compiler.tools.error = def(
  [
  ],

  function () {
    var die = function (code, message) {
        console.error("error: " + message + "\n");
        process.exit(code);
    };

    return {
      die: die
    };
  }
);
