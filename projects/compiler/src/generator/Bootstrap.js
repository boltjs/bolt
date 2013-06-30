bolt.compiler.generator.Bootstrap = def(
  [
    bolt.compiler.tools.Files,
    bolt.compiler.tools.Io
  ],

  function (Files, Io) {
    var generate = function (target, bonus) {
      Io.saferm(target);
      var corefiles = Files.files(__dirname, ['base.js', 'kernel.js', 'loader.js', 'module.js']);
      var contents =  corefiles.join('\n') + bonus;
      Io.write(target, contents);
    };

    return {
      generate: generate
    };
  }
);
