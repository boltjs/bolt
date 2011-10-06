// FIX reconsider name, but compiler.compile.compiler.compile() method calls would rock.
compiler.compile.compiler = def(
  [
    compiler.tools.io
  ],

  function (io) {
    var compile = function (config, module, target) {
      io.write(target, "var x = 'this is module: " + module + "'");
    };

    return {
        compile: compile
    };
  }
);