// FIX reconsider name, but compiler.compile.compiler.compile() method calls would rock.
compiler.compile.compiler = def(
  [
    compiler.tools.io,
    compiler.tools.error
  ],

  function (io, error) {
    var compile = function (modulator, id, target) {
      if (!modulator.can(id))
        error.die(90, "No modulator can load module: " + id);
      var spec = modulator.modulate(id);
      var content = spec.render();
      io.write(target, content);
    };

    return {
        compile: compile
    };
  }
);