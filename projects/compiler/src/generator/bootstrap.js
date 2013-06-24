compiler.generator.bootstrap = def(
  [
    compiler.tools.files,
    compiler.tools.io
  ],

  function (files, io) {
    var generate = function (target, bonus) {
      io.saferm(target);
      var corefiles = files.files(__dirname, ['kernel.js', 'loader.js', 'module.js']);
      var contents =  corefiles.join('\n') + bonus;
      io.write(target, contents);
    };

    return {
      generate: generate
    };
  }
);
